import React, { useEffect, useRef } from 'react';

const ParallaxScreen = () => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!parallaxRef.current) return;

            const w = window.innerWidth;
            const h = window.innerHeight;
            const offsetX = 0.5 - e.pageX / w;
            const offsetY = 0.5 - e.pageY / h;

            const elements = parallaxRef.current.querySelectorAll('.parallax');
            elements.forEach((el) => {
                const offset = parseInt(el.getAttribute('data-offset'));
                const translate = `translate3d(${Math.round(offsetX * offset)}px, ${Math.round(offsetY * offset)}px, 0px)`;
                el.style.transform = translate;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={parallaxRef} className="parallax-container">
            {/* Добавьте ваши parallax элементы здесь */}
            <div className="parallax" data-offset="10">Content 1</div>
            <div className="parallax" data-offset="20">Content 2</div>
            <div className="parallax" data-offset="30">Content 3</div>
        </div>
    );
};

export default ParallaxScreen;