import p5 from "p5";
import { ReactP5Wrapper } from "react-p5-wrapper";

const Tree = () => {
  //parameter 'p' is an object that provides various p5.js functions and properties.
  /**
   * @param p  When p5.js starts, the setup function is called once. In this case,
   * it's setting up a canvas with a width and height of 500 pixels.
   */
  const sketch = (p: p5) => {
    let angle:number = p.PI / 4;
    let slider: p5.Element;

    p.setup = () => {
      p.createCanvas(800, 500);
      slider = p.createSlider(0, p.TWO_PI, p.PI / 4, 0.01);
      slider.position(10, p.height + 10);
    };
    /**
     * The draw function is called repeatedly by p5.js after setup. In this case,
     * it's setting the background of the canvas to red on every frame, which creates a red background for the sketch.
     */
    p.draw = () => {
      p.background(150);
      p.translate(400, p.height);
      branch(100);
      angle = slider.value() as number;
    };

    function branch(len: number) {
      p.line(0, 0, 0, -len);
      p.translate(0, -len);
      if (len > 10) {
        p.push();
        p.rotate(angle);
        branch(len * 0.7);
        p.pop();
        p.push();
        p.rotate(-angle);
        branch(len * 0.7);
        p.pop();
        p.push();
        p.rotate(angle - p.PI / 3);
        branch(len * 0.7);
        p.pop();
      }
    }
  };

  return <ReactP5Wrapper sketch={sketch} />;
};
export default Tree;
