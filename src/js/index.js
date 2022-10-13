import '../scss/app.scss';
import Cover from './sections/Cover';
import ScrollHome from './sections/ScrollHome';

document.addEventListener('DOMContentLoaded', () => {

   var FontFaceObserver = require('fontfaceobserver');
   var imagesLoaded = require('imagesloaded');

   let montserrat900 = new FontFaceObserver('Montserrat', { weight: '900' });
   let montserrat600 = new FontFaceObserver('Montserrat', { weight: '600' });

   let images = imagesLoaded(document.querySelectorAll('img'));
   images.on('done', (instance) => {
      console.log('-- images loaded')
   })

   let promises = [
      montserrat900.load(null, 6000),
      montserrat600.load(null, 6000),
      images
   ]

   Promise.all(promises).then((values) => {
      console.log('-- all Promises resolved', values);

      const cover = new Cover();
      cover.startAnimation()
      cover.followAnimation()

      const scroll = ScrollHome();
      scroll.init();

   })

})
