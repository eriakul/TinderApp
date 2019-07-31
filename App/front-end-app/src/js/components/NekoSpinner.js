import React from "react";

export default class Graphic extends React.Component {
    constructor(props) {
        super(props);
        this.paint = this.paint.bind(this);
        this.saveContext = this.saveContext.bind(this);
    }



    saveContext(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    componentDidUpdate() {

        const time = this.props.time;
        const start = 0;

        const width = this.ref.canvas.width;
        const height = this.ref.canvas.height;

        const scaleX = width / 800;
        const scaleY = width / 600;

        console.log(scaleX, scaleY)

        this.ref.canvas.style.width = width + 'px';
        this.ref.canvas.style.height = height + 'px';

        const rect = this.ref.canvas.getBoundingClientRect();

        // Get the device pixel ratio, falling back to 1.
        var dpr = window.devicePixelRatio || 1;
        // Get the size of the canvas in CSS pixels.
        // Give the canvas pixel dimensions of their CSS
        // size * the device pixel ratio.
        this.ref.canvas.width = rect.width * dpr;
        this.ref.canvas.height = rect.height * dpr;


        const ctx = this.ref.canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        const buttAngle = -(time - start) / 400 % (Math.PI * 2)
        const headAngle = buttAngle + 3 + Math.sin((time - start) / 600 % (Math.PI * 2)) * 1.9
        const toungeExtension = Math.sin((time - start) / 300) / 2 + .5

        this.paint({ inner: 105, headAngle, buttAngle, toungeExtension });
    }


    paint({ inner = 105, headAngle = -.99, buttAngle = 4.25, toungeExtension = 1 } = {}) {

        function arc({ radius, center = [0, 0], start = 0, end = Math.PI * 2, counterclockwise = true }) {
            const ctx = this.refs.canvas.getContext("2d");
            ctx.arc(...center, radius, start, end, counterclockwise);
        }

        function circle({ radius, center = [0, 0], start = 0, end = Math.PI * 2, counterclockwise = true }) {
            const ctx = this.refs.canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(...center, radius, start, end, counterclockwise);
            ctx.stroke();
        }
        const { width, height } = this.props;
        const ctx = this.refs.canvas.getContext("2d");


        ctx.fillStyle = '#e6dedd';
        ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)

        ctx.save();

        const debug = false;

        const color = debug ? 'rgba(255, 0, 0, 1)' : '#333333'
        if (!debug) {
            ctx.lineWidth = 10;
        }
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.translate(width / 2, height / 2);

        const innerStart = buttAngle;
        const outerStart = innerStart - .03;
        const innerEnd = headAngle;
        const outerEnd = innerEnd - .01;

        const legInner = inner + 25;
        const outer = inner + 90;
        const legOuter = outer - 25;

        const tailOuter = outer - 33
        const tailInnter = inner + 33

        function arcPoint(radius, angle) {
            ctx.arc(0, 0, radius, angle, angle);
        }

        // body
        ctx.beginPath();
        ctx.arc(0, 0, outer, outerStart, outerEnd + .02, true);
        // ear tip
        ctx.save();
        ctx.rotate(headAngle + .01);
        arc({ center: [outer - 3.25, 0], radius: 3.25, start: -.7, end: Math.PI + .77, counterclockwise: true });
        ctx.restore();
        arcPoint(outer - 20, outerEnd + .08);
        arcPoint(inner + 20, innerEnd + .11);

        // ear tip
        ctx.save();
        ctx.rotate(headAngle + .03);
        arc({ center: [inner + 3.25, 0], radius: 3.25, start: -.7, end: Math.PI, counterclockwise: true });
        ctx.restore();

        ctx.arc(0, 0, inner, innerEnd + .1, innerStart, false);

        ctx.fillStyle = '#eda85e'
        ctx.fill();
        ctx.stroke();


        // ctx.restore();
        //   return;

        // tummy
        ctx.save();
        ctx.lineWidth = 40;
        ctx.strokeStyle = '#f2c289';
        circle({ radius: (outer - inner) / 2 + inner, start: innerStart - 6.87, end: innerEnd + .72 })
        ctx.restore();

        // eyes
        // left
        ctx.beginPath();
        arcPoint(inner + 26, innerEnd + .26);
        // safari :(
        arcPoint(inner + 26.01, innerEnd + .26);
        ctx.stroke();

        // right
        ctx.beginPath();
        arcPoint(outer - 21, outerEnd + .211);
        // safari :(
        arcPoint(outer - 21.01, outerEnd + .211);
        ctx.stroke();

        // tongue
        ctx.save();
        ctx.rotate(innerEnd + .3 + .067 * toungeExtension);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(inner + 50, 0, 4, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#9F5A5C';
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // nose?

        function squiggle() {
            ctx.rotate(innerEnd + .325);
            ctx.ellipse(inner + 47, 0, 3, 3.5, 0, Math.PI, Math.PI * 2, true);

            ctx.rotate(-.01);
            ctx.ellipse(inner + 53, 0, 3, 3.5, 0, Math.PI, Math.PI * 2, true);
        }

        ctx.save();
        ctx.beginPath();
        arcPoint(inner + 47 - 3, innerEnd + .25);
        ctx.save();
        squiggle();
        ctx.restore();
        arcPoint(inner + 53 + 3, innerEnd + .25);
        ctx.strokeStyle = ctx.fillStyle = '#eda85e'

        ctx.fill();
        if (!debug) {
            ctx.lineWidth = 3.5;
        }
        ctx.stroke();
        ctx.restore();

        ctx.save();
        if (!debug) {
            ctx.lineWidth = 4;
        }
        ctx.beginPath();

        squiggle();
        ctx.stroke();
        ctx.restore();




        ctx.save();
        ctx.rotate(innerStart);
        ctx.beginPath()
        arc({ radius: inner, start: -0.24, end: 0, counterclockwise: false });
        // leg paw inner
        arc({ radius: 12.5, center: [legInner - 12.5, 0], start: Math.PI, end: 0 });
        // leg inner
        arc({ radius: legInner, start: 0, end: -0.24 });
        ctx.fill()
        ctx.stroke();
        ctx.restore();


        ctx.save();
        ctx.rotate(outerStart);
        ctx.beginPath()
        // leg outer
        arc({ radius: legOuter, start: -0.18, end: 0, counterclockwise: false });
        // leg paw outer
        arc({ radius: 12.5, center: [outer - 12.5, 0], start: Math.PI, end: 0 });
        arc({ radius: outer, start: 0, end: -0.18 });
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // tail
        ctx.save();

        ctx.rotate(innerStart - 6.125);
        ctx.beginPath()
        arc({ radius: tailInnter, start: -.32, end: 0, counterclockwise: false })
        arc({ radius: (tailOuter - tailInnter) / 2, center: [(tailOuter - tailInnter) / 2 + tailInnter, 0], start: Math.PI })
        arc({ radius: tailOuter, end: -.32 })
        ctx.fillStyle = '#ca8437'
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // butt
        ctx.save();
        ctx.rotate(innerStart - .47);
        circle({ radius: 45, center: [inner + (outer - inner) / 2, 0], start: Math.PI - 1, end: Math.PI + 4.5 });
        ctx.restore();



        ctx.save();
        ctx.rotate(innerEnd + 1.12);
        // arm inner
        circle({ radius: legInner, start: -0.30, end: 0, counterclockwise: false });
        // arm paw inner
        circle({ radius: 12.5, center: [legInner - 12.5, 0], start: Math.PI, end: 0 });
        ctx.restore();

        ctx.save();
        ctx.rotate(innerEnd + .99);
        // arm outer
        circle({ radius: legOuter, start: -0.18, end: 0, counterclockwise: false });

        // paw outer
        circle({ radius: 12.5, center: [outer - 12.5, 0], start: Math.PI, end: 0 });
        ctx.restore();

        // whiskers

        ctx.lineWidth = 6

        // left
        ctx.beginPath();
        arcPoint(inner + 9, innerEnd + .315);
        arcPoint(inner - 15, innerEnd + .3);
        ctx.stroke();

        ctx.beginPath();
        arcPoint(inner + 11, innerEnd + .39);
        arcPoint(inner - 14, innerEnd + .44);
        ctx.stroke();

        ctx.beginPath();
        arcPoint(inner + 12.5, innerEnd + .465);
        arcPoint(inner - 9.26, innerEnd + .56);
        ctx.stroke();

        // right
        ctx.beginPath();
        arcPoint(outer - 10.5, outerEnd + .3);
        arcPoint(outer + 11.95, outerEnd + .293);
        ctx.stroke();

        ctx.beginPath();
        arcPoint(outer - 11.6, outerEnd + .35);
        arcPoint(outer + 12.42, outerEnd + .34);
        ctx.stroke();

        ctx.beginPath();
        arcPoint(outer - 10.26, outerEnd + .4);
        arcPoint(outer + 13.58, outerEnd + .4);
        ctx.stroke();

        ctx.restore();
    }


    render() {
        const { width, height } = this.props;
        return (
            <canvas
                contextRef={this.saveContext}
                width={width}
                height={height}
            />
        );
    }
}