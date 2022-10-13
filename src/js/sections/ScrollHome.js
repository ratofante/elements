import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from '../libraries/SplitText';

import LocomotiveScroll from 'locomotive-scroll';

export default function ScrollHome() {
   gsap.registerPlugin(ScrollTrigger);
   /*
      https://codepen.io/GreenSock/pen/ExPdqKy?editors=0010
   */

   const scroller = '.main-wrapper';

   const locoScroll = new LocomotiveScroll({
      el: document.querySelector(scroller),
      smooth: true,
      multiplier: .7,
      smartphone: {
         smooth: true
      }
   });

   locoScroll.on('scroll', ScrollTrigger.update);

   ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector(scroller).style.transform ? 'transform' : 'fixed'
   });


   //Animations

   let trees = gsap.timeline({
      scrollTrigger: {
         trigger: '.home-body-img-top',
         start: "top 80%",
         scroller: scroller,
         scrub: true,
         snap: {
            snapTo: 'labels',
            ease: "power1.in"
         }
      }
   });
   trees.addLabel("start").to('.trees', { y: '50px', scale: 1.05 });

   let dottyTxt = new SplitText('.dotty-text', { type: 'chars' });
   dottyTxt = dottyTxt.chars.reverse();

   let dottyTl = gsap.timeline({
      scrollTrigger: {
         trigger: '.dotty',
         start: 'top 90%',
         scrub: 1,
         scroller: scroller,
         snap: 0.2
      }
   });
   dottyTl.from('.dotty', { duration: .5, opacity: 0, scale: 1.08, ease: 'linear' })
      .to('.dotty', {
         duration: 1,
         left: '10%',
         scale: 1,
         ease: "power3.out"
      })
      .from(dottyTxt, {
         duration: .8,
         opacity: 0
      }, "<+0.1")
      .to(dottyTxt, {
         color: '#ffffff',
         ease: "power1.out",
         stagger: .2
      }, "<+.1")
      .from(dottyTxt, {
         x: 20
      }, "<")
      .to(dottyTxt, {
         duration: .8,
         x: 0,
         textShadow: '-4px 2px black',
         ease: "power1.out",
         stagger: .1
      }, "<")
      .to(dottyTxt, {
         duration: 1,
         textShadow: '-2px 1px black',
         stagger: .1,
         ease: "power1.out"
      });

   let glaciar = gsap.timeline({
      scrollTrigger: {
         trigger: '.home-body-img-bottom-pic',
         scroller: scroller,
         markers: true,
         start: 'top 70%',
         end: 'top 5%',
         scrub: true,
         ease: "slow(0.7, 0.4, false)",
      }
   });
   glaciar.to('.home-body-img-bottom-pic', {
      scale: 0.9,
      transform: 'translateY(-58%)',
      height: '500px',
   }).to('.home-body-img-bottom-pic', {
      scale: 1,
      clipPath: 'polygon(10% 10%, 90% 10%, 90% 10%, 10% 10%)'
   });


   let splitTxt = new SplitText('.home-body-img-bottom-p', { type: 'lines' });
   splitTxt = splitTxt.lines;

   let txtTl = gsap.timeline({
      scrollTrigger: {
         trigger: '.home-body-img-bottom-p',
         scroller: scroller,
         start: 'top 90%',
         snap: 0.2,
         scrub: 0.1
      }
   });
   txtTl.fromTo(splitTxt, {
      opacity: 0,
      x: -10
   }, {
      duration: 0.8,
      x: 0,
      opacity: 1,
      ease: "power2.in",
      stagger: .8
   }).to(splitTxt, {
      duration: 1,
      opacity: 0,
      y: -30,
      x: -10,
      ease: "power2.in"
   });





   //Refresh!

   ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
   ScrollTrigger.refresh();

   return locoScroll;
}
