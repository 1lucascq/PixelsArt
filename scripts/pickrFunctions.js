// Source: https://github.com/Simonwep/pickr
// eslint-disable-next-line no-undef
const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'classic',
  useAsButton: true,

  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(255, 193, 7, 1)',
  ],

  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      rgba: true,
      input: true,
      save: true,
    },
  },
});

pickr.on('init', () => {
  const bgButton = document.querySelector('.pcr-save');
  bgButton.value = 'Change Background';
  bgButton.style.backgroundColor = 'black';
  bgButton.style.color = 'white';
});

pickr.on('save', (color) => {
  const colorArr = color.toHEXA();
  const personalizedColor = colorArr.toString();
  document.body.style.background = `radial-gradient(circle at 80% 30%,
    ${personalizedColor}, #222222)`;
  const title = document.querySelector('#title');
  title.style.color = personalizedColor;
  const footer = document.querySelector('.footer-section');
  footer.style.color = personalizedColor;
});

pickr.on('change', (color) => {
  const colorArr = color.toHEXA();
  const pickrColor = document.querySelector('.selected');
  const personalizedColor = colorArr.toString();
  pickrColor.style.backgroundColor = personalizedColor;
  if (personalizedColor === '#FFFFFF') {
    pickrColor.style.borderColor = '#000000';
  } else {
    pickrColor.style.borderColor = '#FFFFFF';
  }
});

// eslint-disable-next-line no-undef
const palettePickr = Pickr.create({
  el: '.cp-big-screens',
  theme: 'classic',
  useAsButton: true,

  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 193, 7, 1)',
  ],

  components: {
    preview: true,
    opacity: true,
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
      save: true,
    },
  },
});

palettePickr.on('init', () => {
  const bgButton = document.querySelectorAll('.pcr-save');
  bgButton[1].value = 'Change Background';
  bgButton[1].style.backgroundColor = 'black';
  bgButton[1].style.color = 'white';
});

palettePickr.on('save', (color) => {
  const colorAr = color.toHEXA();
  const personalizedColor = colorAr.toString();
  document.body.style.background = `radial-gradient(circle at 80% 30%,
    ${personalizedColor}, #222222)`;
  const title = document.querySelector('#title');
  title.style.color = personalizedColor;
  const footer = document.querySelector('.footer-link');
  footer.style.color = personalizedColor;
});

palettePickr.on('change', (color) => {
  const colorAr = color.toHEXA();
  const pickrColor = document.querySelector('.selected');
  const personalizedColor = colorAr.toString();
  pickrColor.style.backgroundColor = personalizedColor;
  if (personalizedColor === '#FFFFFF') {
    pickrColor.style.borderColor = '#000000';
  } else {
    pickrColor.style.borderColor = '#FFFFFF';
  }
});
