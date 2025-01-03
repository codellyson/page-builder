import { Editor } from "grapesjs";

export const Carousel = (editor: Editor) => {
  editor.DomComponents.addType("carousel-component", {
    isComponent(el) {
      return el.classList?.contains('carousel-container');
    },
    model: {
      defaults: {
        tagName: "div",
        attributes: {
          class: "carousel-container relative w-full max-w-full mx-auto",
        },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'carousel-slides overflow-hidden relative' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'slide bg-gray-200 p-8 text-center' },
                content: 'Slide 1'
              },
              {
                tagName: 'div',
                attributes: { class: 'slide bg-gray-300 p-8 text-center hidden' },
                content: 'Slide 2'
              },
              {
                tagName: 'div',
                attributes: { class: 'slide bg-gray-400 p-8 text-center hidden' },
                content: 'Slide 3'
              }
            ]
          },
          {
            tagName: 'button',
            attributes: { 
              class: 'prev-btn absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2',
              'data-carousel-prev': true
            },
            content: '←'
          },
          {
            tagName: 'button',
            attributes: { 
              class: 'next-btn absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2',
              'data-carousel-next': true
            },
            content: '→'
          }
        ],
        traits: [
          {
            type: 'number',
            label: 'Slide Duration (ms)',
            name: 'slideDuration',
            default: 3000,
          }
        ],
      }
    },
    view: {
      init() {
        const { model } = this;
        this.listenTo(model, 'change:slideDuration', this.updateDuration);
        this.currentSlide = 0;
      },

      events: {
        'click [data-carousel-prev]': 'prevSlide',
        'click [data-carousel-next]': 'nextSlide',
      },

      onRender({ el }) {
        this.slides = el.querySelectorAll('.slide');
        this.startAutoPlay();
      },

      updateDuration() {
        this.startAutoPlay();
      },

      startAutoPlay() {
        if (this.interval) clearInterval(this.interval);
        const duration = this.model.get('slideDuration') || 3000;
        this.interval = setInterval(() => this.nextSlide(), duration);
      },

      prevSlide() {
        this.showSlide(this.currentSlide - 1);
      },

      nextSlide() {
        this.showSlide(this.currentSlide + 1);
      },

      showSlide(index) {
        const slides = this.slides;
        if (!slides.length) return;

        // Handle wrapping
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Hide all slides
        slides.forEach(slide => slide.classList.add('hidden'));
        
        // Show current slide
        slides[index].classList.remove('hidden');
        this.currentSlide = index;
      }
    }
  });
}; 