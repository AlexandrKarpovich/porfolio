import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import OpenPeepsSheetImg from '../../images/open-peeps-sheet.png';

const config = {
  src: OpenPeepsSheetImg,
  rows: 15,
  cols: 7
};

const randomRange = (min, max) => min + Math.random() * (max - min);
const randomIndex = (array) => Math.floor(randomRange(0, array.length));
const removeFromArray = (array, i) => array.splice(i, 1)[0];
const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
const getRandomFromArray = (array) => array[randomIndex(array)];

class Peep {
  constructor({ image, rect }) {
    this.image = image;
    this.setRect(rect);
    this.x = 0;
    this.y = 0;
    this.anchorY = 0;
    this.scaleX = 1;
    this.walk = null;
  }

  setRect(rect) {
    this.rect = rect;
    this.width = rect[2];
    this.height = rect[3];
    this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, 1);
    ctx.drawImage(...this.drawArgs);
    ctx.restore();
  }
}

const CrowdSimulator = () => {
  const canvasRef = useRef(null);

  const resetPeep = useCallback(({ stage, peep }) => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
    const startY = stage.height - peep.height + offsetY;
    let endX;

    if (direction === 1) {
      endX = stage.width;
      peep.scaleX = 1;
    } else {
      endX = 0;
      peep.scaleX = -1;
    }

    peep.x = direction === 1 ? -peep.width : stage.width + peep.width;
    peep.y = startY;
    peep.anchorY = startY;

    return { startY, endX };
  }, []);

  const normalWalk = useCallback(({ peep, props }) => {
    const { startY, endX } = props;
    const xDuration = 10;
    const yDuration = 0.25;

    const tl = gsap.timeline();
    tl.timeScale(randomRange(0.5, 1.5));
    tl.to(peep, {
      duration: xDuration,
      x: endX,
      ease: 'none'
    }, 0);
    tl.to(peep, {
      duration: yDuration,
      repeat: xDuration / yDuration,
      yoyo: true,
      y: startY - 10
    }, 0);

    return tl;
  }, []);

  const init = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const stage = {
      width: canvas.clientWidth,
      height: canvas.clientHeight
    };

    canvas.width = stage.width * devicePixelRatio;
    canvas.height = stage.height * devicePixelRatio;

    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(new Peep({
          image: img,
          rect: [
            (i % rows) * rectWidth,
            (Math.floor(i / rows)) * rectHeight,
            rectWidth,
            rectHeight,
          ]
        }));
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray([normalWalk])({
        peep,
        props: resetPeep({ peep, stage })
      }).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      const index = crowd.indexOf(peep);
      if (index > -1) {
        crowd.splice(index, 1);
      }
      availablePeeps.push(peep);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
      requestAnimationFrame(render);
    };

    createPeeps();
    availablePeeps.push(...allPeeps);
    initCrowd();
    render();
  }, [normalWalk, resetPeep]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => init(img);
    img.src = config.src;

    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default CrowdSimulator;

// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import OpenPeepsSheetImg from '../../images/open-peeps-sheet.png';

// const config = {
//   src: OpenPeepsSheetImg,
//   rows: 15,
//   cols: 7
// };

// const randomRange = (min, max) => min + Math.random() * (max - min);
// const randomIndex = (array) => Math.floor(randomRange(0, array.length));
// const removeFromArray = (array, i) => array.splice(i, 1)[0];
// // const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
// const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
// const getRandomFromArray = (array) => array[randomIndex(array)];

// class Peep {
//   constructor({ image, rect }) {
//     this.image = image;
//     this.setRect(rect);
//     this.x = 0;
//     this.y = 0;
//     this.anchorY = 0;
//     this.scaleX = 1;
//     this.walk = null;
//   }

//   setRect(rect) {
//     this.rect = rect;
//     this.width = rect[2];
//     this.height = rect[3];
//     this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
//   }

//   render(ctx) {
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.scale(this.scaleX, 1);
//     ctx.drawImage(...this.drawArgs);
//     ctx.restore();
//   }
// }

// const CrowdSimulator = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const img = new Image();
//     img.onload = () => init(img);
//     img.src = config.src;

//     const handleResize = () => {
//       if (canvasRef.current) {
//         const canvas = canvasRef.current;
//         canvas.width = canvas.clientWidth * devicePixelRatio;
//         canvas.height = canvas.clientHeight * devicePixelRatio;
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const resetPeep = ({ stage, peep }) => {
//     const direction = Math.random() > 0.5 ? 1 : -1;
//     const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random());
//     const startY = stage.height - peep.height + offsetY;
//     let startX, endX;

//     if (direction === 1) {
//       startX = -peep.width;
//       endX = stage.width;
//       peep.scaleX = 1;
//     } else {
//       startX = stage.width + peep.width;
//       endX = 0;
//       peep.scaleX = -1;
//     }

//     peep.x = startX;
//     peep.y = startY;
//     peep.anchorY = startY;

//     return { startX, startY, endX };
//   };

//   const normalWalk = ({ peep, props }) => {
//     const { startX, startY, endX } = props;
//     const xDuration = 10;
//     const yDuration = 0.25;

//     const tl = gsap.timeline();
//     tl.timeScale(randomRange(0.5, 1.5));
//     tl.to(peep, {
//       duration: xDuration,
//       x: endX,
//       ease: 'none'
//     }, 0);
//     tl.to(peep, {
//       duration: yDuration,
//       repeat: xDuration / yDuration,
//       yoyo: true,
//       y: startY - 10
//     }, 0);

//     return tl;
//   };

//   const walks = [normalWalk];

//   const init = (img) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     const stage = {
//       width: canvas.clientWidth,
//       height: canvas.clientHeight
//     };

//     canvas.width = stage.width * devicePixelRatio;
//     canvas.height = stage.height * devicePixelRatio;

//     const allPeeps = [];
//     const availablePeeps = [];
//     const crowd = [];

//     const createPeeps = () => {
//       const { rows, cols } = config;
//       const { naturalWidth: width, naturalHeight: height } = img;
//       const total = rows * cols;
//       const rectWidth = width / rows;
//       const rectHeight = height / cols;

//       for (let i = 0; i < total; i++) {
//         allPeeps.push(new Peep({
//           image: img,
//           rect: [
//             (i % rows) * rectWidth,
//             (Math.floor(i / rows)) * rectHeight,
//             rectWidth,
//             rectHeight,
//           ]
//         }));
//       }
//     };

//     const initCrowd = () => {
//       while (availablePeeps.length) {
//         addPeepToCrowd().walk.progress(Math.random());
//       }
//     };

//     const addPeepToCrowd = () => {
//       const peep = removeRandomFromArray(availablePeeps);
//       const walk = getRandomFromArray(walks)({
//         peep,
//         props: resetPeep({ peep, stage })
//       }).eventCallback('onComplete', () => {
//         removePeepFromCrowd(peep);
//         addPeepToCrowd();
//       });

//       peep.walk = walk;
//       crowd.push(peep);
//       crowd.sort((a, b) => a.anchorY - b.anchorY);
//       return peep;
//     };

//     const removePeepFromCrowd = (peep) => {
//       const index = crowd.indexOf(peep);
//       if (index > -1) {
//         crowd.splice(index, 1);
//       }
//       availablePeeps.push(peep);
//     };

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.save();
//       ctx.scale(devicePixelRatio, devicePixelRatio);

//       crowd.forEach((peep) => {
//         peep.render(ctx);
//       });

//       ctx.restore();
//       requestAnimationFrame(render);
//     };

//     createPeeps();
//     availablePeeps.push(...allPeeps);
//     initCrowd();
//     render();
//   };

//   return (
//     <canvas
//       ref={canvasRef}
//       id="canvas"
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: -1
//       }}
//     />
//   );
// };

// export default CrowdSimulator;