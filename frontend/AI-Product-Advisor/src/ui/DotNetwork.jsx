import React, { useEffect } from 'react';

const DotNetwork = () => {

  useEffect(() => {
    const svg = document.getElementById('svg');
    const dotMatrix = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    const lineMatrix = document.createElementNS("http://www.w3.org/2000/svg", 'line');

    let dots = [];
    let lines = [];
    const dotNumber = 300;
    const lineNumber = 5;

    let screenW, screenH, dotColumns, dotRows;
    const dotRandomMax = 2;

    let mouseMoving = false;
    let mouse = {};
    mouse.distances = [];
    mouse.power = 10;
    let mouseX = 0;
    let mouseY = 0;

    function getDistance(obj1, obj2) {
      return Math.floor(Math.sqrt(Math.pow((obj1.X - obj2.X), 2) + Math.pow((obj1.Y - obj2.Y), 2)));
    }

    function Comparator(a, b) {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    }

    function init() {
      screenW = window.innerWidth;
      screenH = window.innerHeight;

      dotRows = Math.sqrt(dotNumber * (screenH / screenW));
      dotColumns = dotNumber / dotRows;
      const dotPosStepX = Math.round(screenW / dotColumns);
      const dotPosStepY = Math.round(screenH / dotRows);
      dotRows = Math.round(dotRows);
      dotColumns = Math.round(dotColumns);

      for (let i = 0, j = 0, k = 0; i < dotNumber; i++, k++) {
        if (i % dotColumns === 0) {
          j++;
          k = 0;
        }
        dots[i] = {};
        dots[i].distances = [];
        dots[i].el = dotMatrix.cloneNode(false);
        dots[i].X = k * dotPosStepX + dotPosStepX / 2;
        dots[i].X += Math.floor((Math.random() * dotRandomMax) + 1 - dotRandomMax / 2);
        dots[i].Y = j * dotPosStepY - dotPosStepY / 2;
        dots[i].Y += Math.floor((Math.random() * dotRandomMax) + 1 - dotRandomMax / 2);
        dots[i].r = 1;
        dots[i].lines = [];
        dots[i].el.setAttribute('cx', dots[i].X);
        dots[i].el.setAttribute('cy', dots[i].Y);
        dots[i].el.setAttribute('r', dots[i].r);
        svg.appendChild(dots[i].el);

        for (let l = 0; l < lineNumber; l++) {
          dots[i].lines[l] = {};
          dots[i].lines[l].el = lineMatrix.cloneNode(false);
          dots[i].lines[l].X1 = dots[i].X;
          dots[i].lines[l].Y1 = dots[i].Y;
          dots[i].lines[l].X2 = dots[i].X;
          dots[i].lines[l].Y2 = dots[i].Y;
          dots[i].lines[l].el.setAttribute('x1', dots[i].lines[l].X1);
          dots[i].lines[l].el.setAttribute('y1', dots[i].lines[l].Y1);
          svg.appendChild(dots[i].lines[l].el);
        }
      }
    }

    function destroy() {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      dots.length = 0;
      lines.length = 0;
    }

    function dotUpdate() {
      for (let i = 0; i < dotNumber; i++) {
        dots[i].el.setAttribute('cx', dots[i].X);
        dots[i].el.setAttribute('cy', dots[i].Y);
        dots[i].el.setAttribute('r', dots[i].r);
        for (let l = 0; l < lineNumber; l++) {
          dots[i].lines[l].el.setAttribute('x1', dots[i].lines[l].X1);
          dots[i].lines[l].el.setAttribute('y1', dots[i].lines[l].Y1);
          dots[i].lines[l].el.setAttribute('x2', dots[i].lines[l].X2);
          dots[i].lines[l].el.setAttribute('y2', dots[i].lines[l].Y2);
        }
      }
    }

    function moveDots() {
      for (let i = 0; i < dotNumber; i++) {
        dots[i].X += Math.floor((Math.random() * 5) - 2);
        dots[i].Y += Math.floor((Math.random() * 5) - 2);
        for (let j = 0; j < dotNumber; j++) {
          dots[i].distances[j] = [j, getDistance(dots[i], dots[j])];
        }
        dots[i].distances = dots[i].distances.sort(Comparator);
        for (let k = 0; k < lineNumber; k++) {
          dots[i].lines[k].X1 = dots[i].X;
          dots[i].lines[k].Y1 = dots[i].Y;
          dots[i].lines[k].X2 = dots[dots[i].distances[k][0]].X;
          dots[i].lines[k].Y2 = dots[dots[i].distances[k][0]].Y;
        }
      }
      dotUpdate();
    }

    function mouseInteraction() {
      if (mouseMoving) {
        mouse.X = mouseX;
        mouse.Y = mouseY;

        for (let i = 0; i < dotNumber; i++) {
          dots[i].r = 1;
          mouse.distances[i] = [i, getDistance(mouse, dots[i])];
        }
        mouse.distances = mouse.distances.sort(Comparator);

        for (let j = 0; j < mouse.power; j++) {
          const maxDist = mouse.distances[mouse.power - 1][1];
          const thisDist = mouse.distances[j][1];
          dots[mouse.distances[j][0]].r = 2;

          if (mouseX >= dots[mouse.distances[j][0]].X) {
            dots[mouse.distances[j][0]].X -= (maxDist - thisDist) / 15;
          } else {
            dots[mouse.distances[j][0]].X += (maxDist - thisDist) / 15;
          }
          if (mouseY >= dots[mouse.distances[j][0]].Y) {
            dots[mouse.distances[j][0]].Y -= (maxDist - thisDist) / 15;
          } else {
            dots[mouse.distances[j][0]].Y += (maxDist - thisDist) / 15;
          }
        }

        mouseMoving = false;
      }
    }

    init();

    const interval = setInterval(() => {
      moveDots();
      mouseInteraction();
    }, 20);

    const handleMouseMove = (e) => {
      mouseMoving = true;
      mouseX = e.pageX;
      mouseY = e.pageY;
    };

    const handleResize = () => {
      destroy();
      init();
    };

    svg.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // cleanup on unmount
    return () => {
      clearInterval(interval);
      svg.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      destroy();
    };
  }, []);

  return <svg id="svg" style={{ width: '100%', height: '100%' }}></svg>;
};

export default DotNetwork;
