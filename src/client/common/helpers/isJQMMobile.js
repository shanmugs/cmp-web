 // Redirect to Rails hosted home page. This limited user agent detection is copied verbatim
 // from the Rails Application to preserve functionality. It should NOT be used by anything other
 // than JQM related functionality.
 const isJQMMobile = (userAgent) => {
     return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i
         .test(userAgent));
 };

 export default isJQMMobile;
