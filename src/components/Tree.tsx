import p5 from "p5";
import { ReactP5Wrapper } from "react-p5-wrapper";

const Tree = () => {
  //parameter 'p' is an object that provides various p5.js functions and properties.
  /**
   * @param p  When p5.js starts, the setup function is called once. In this case,
   * it's setting up a canvas with a width and height of 500 pixels.
   */
  const sketch = (p: p5) => {
    let angle: number = p.PI / 4;
    let slider: p5.Element;

    p.setup = () => {
      const canvasWidth = window.innerWidth; // Adjust as needed
      const canvasHeight = window.innerHeight - 100; // Adjust as needed
      p.createCanvas(canvasWidth, canvasHeight);
      slider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01); //min, max, default value, step
      slider.position(10, p.height + 10);
    };
    /**
     * The draw function is called repeatedly by p5.js after setup. In this case,
     * it's setting the background of the canvas to red on every frame, which creates a red background for the sketch.
     */
    p.draw = () => {
      p.background("black");
      p.translate(p.width / 2, p.height - 50); //Start the tree from the bottom of the screen
      branch(150); //length of a branch
      angle = slider.value() as number;
    };

    function branch(len: number) {
      p.strokeWeight(p.map(len, 2, 180, 0.2, 10)); // dynamically adjust the width of branch
      p.line(0, 0, 0, -len);
      p.translate(0, -len);
      if (len > 25) {
        p.stroke("brown");
        p.push();
        p.rotate(angle);
        branch(len * 0.67);
        p.pop();
        p.push();
        p.rotate(-angle);
        branch(len * 0.73);
        p.pop();
        p.push();
        p.rotate(angle - p.PI / 3);
        branch(len * 0.6);
        p.pop();
      } else {
        p.fill(255, 0, 200, 150);
        p.noStroke();
        p.circle(0, 0, 12);
      }
    }
  };

  return <ReactP5Wrapper sketch={sketch} />;
};
export default Tree;
