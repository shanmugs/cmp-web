// Carousel Component
// ===
//
// Carousel Abstraction that wraps slick slider
//

// Vendor components
// ---
// Import plugins from our node_modules directory
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.scss';

// Component Styles
// ---
import './carousel.scss';


class Carousel extends React.Component {
    render() {
        const { children,
            className,
            sliderConfig,
            sliderRef
        } = this.props;

        const componentClass = classNames(
            'c-carousel',
            className
        );

        const defaultConfig = {
            className: componentClass,
            dots: true,
            dotsClass: 'carousel__dots-wrapper',
            infinite: false,
            speed: 300,
            arrows: false,
        };

        const combinedConfig = Object.assign({}, defaultConfig, sliderConfig);

        // Return JSX components to output Markup to the DOM
        return (
            <Slider {...combinedConfig} ref={sliderRef}>
                {/*
                    need to wrap everything passed to Slider in a plain div to  allow slick to
                    calculate element width. Won't take custom classes, even if they return divs :(
                */}
                {children.map((child, idx) => (
                    <div className="c-carousel__slide" key={idx}>{child}</div>
                ))}
            </Slider>
        );
    }
}

// Explicitly state they type of Components you expect here
Carousel.propTypes = {
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    sliderConfig: PropTypes.object,
    sliderRef: PropTypes.func,
};

export default Carousel;
