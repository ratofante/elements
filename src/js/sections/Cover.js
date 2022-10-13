import { gsap } from 'gsap';
import SplitText from '../libraries/SplitText';

class Cover {

   dot = document.querySelector('.logo');
   ice = new SplitText('#ice', { type: "chars" });
   sub = new SplitText('#cover-sub', { type: "words" });
   cover = document.querySelector('.cover-text');
   tl = gsap.timeline();


   startAnimation() {
      console.log('-- animation started')

      let clrWhite = '#ffffff';
      let clrBlue = '#021e4a';

      gsap.set('body', { overflow: 'hidden' });
      gsap.set(this.ice.chars, { color: clrBlue });

      //let tl = gsap.timeline();
      this.tl.to('.cover-mask', { duration: .5, opacity: 0, zIndex: -1000 })
         .fromTo(this.dot, { top: 0, background: clrBlue },
            { duration: 0.9, top: 'max(32vh, 188px)', background: clrWhite, ease: "expo.in" })
         .set(this.ice.chars[0], { color: clrWhite })
         .fromTo([this.ice.chars[1], this.ice.chars[2]], { x: -10 },
            { duration: 0.9 - 0.2, x: 0, opacity: 1, ease: "power4.out", stagger: 0.2 },
            ">")
         .to([this.ice.chars[1], this.ice.chars[2]], { color: clrWhite, duration: 0.9 - 0.2 }, "<")
         .to(this.ice.chars[2], { duration: 5, x: 100, ease: "circ.out" }, "<")
         .fromTo(this.sub.words, { y: -10, visibility: 'hidden' },
            { duration: .4, y: 0, visibility: 'visible', ease: "expo.in", stagger: 0.01 },
            "<")
         .to('#cover-sub', { letterSpacing: '4px', duration: 2, ease: "circ.out" }, "<")
         //.to(this.ice.chars[1], { color: clrBlue, duration: .5, ease: "power4.inOut" }, "<.9")
         .to(this.sub.words[1], { color: clrBlue, duration: .5, ease: "power4.inOut" }, "<")
         .to(this.sub.words[3], { color: clrBlue, duration: .5, ease: "power4.inOut" }, "<")
         .addLabel('primeraParte', "<");
   }

   followAnimation() {

      let clrWhite = '#ffffff';
      let clrBlue = '#021e4a';
      let text = new SplitText('.home-text-p', { type: 'lines' });

      //Sube Cover
      this.tl.to('.cover', { duration: 2, y: '-100%', ease: "power4.inOut" }, "primeraParte")
         .to(this.dot, { top: 0, background: clrBlue, duration: 2, ease: "power4.inOut" }, "<")
         .fromTo('.menu-btn', { color: clrWhite, opacity: 0 }, { duration: .8, color: clrBlue, opacity: 1 }, "<")
         .fromTo('.nav-headers-text', { opacity: 0, y: -70 },
            { duration: 2.5, y: 0, ease: "back.inOut(1.7)", opacity: 1 },
            "<")

         //Sube Home
         .to('.home', { duration: 2, y: '0%', ease: "power3.inOut" }, "<")
         .fromTo('.home-hero-title', { transform: 'translate(0%, 80%)' },
            { duration: 6, transform: 'translate(0%, 30%)', ease: "power4.out" }, "<")
         .fromTo(text.lines, { opacity: 0, y: -20 },
            { duration: .6, opacity: 1, y: 0, ease: "back.inOut(1.7)", stagger: 0.2 }, "<+1.3")
         .from('.trees', { duration: 2, transform: 'translate(0%, -300px)', opacity: 0, ease: "power1.out" }, "<")
         .to('body', { overflow: 'scroll' }, ">-1");

   }
}

export default Cover;