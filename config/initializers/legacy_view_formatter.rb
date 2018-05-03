# @todo CLEANUP GIVEA-377
class LegacyViewFormatter
  def initialize app
    @app = app
  end

  # As a temporary measure and as a first step in migration to
  # a single page application, this middleware takes pages that as marked as
  # LegacyContentRequest and instead of rendering html, makes them JSON
  # so that Front-End Application can consume them as templates.
  # It is fully backwards compatible and is initiated only if custom header
  # "X-REQUESTED_WITH" is sent
  def call env
    @status, @headers, @response = @app.call(env)
    if @headers.has_key?("X_REQUESTED_WITH") && @headers["X_REQUESTED_WITH"].include?("LegacyContentRequest")

      #converting content-type to json
      @response['Content-Type'] = "application/json"

      if @status == 200
        # sending view as a JSON string back to Front-End App
        @body = {:content => @response.body}.to_json
        @response.body = @body
      elsif @status == 302
        @status = 205 #needed because otherwise Browser does not give access to a response if status is 302
      end
    end

    [@status, @headers, @response]
  end

end
