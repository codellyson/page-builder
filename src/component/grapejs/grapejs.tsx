import grapesjs, { Asset, Editor, EditorConfig } from "grapesjs";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from "@grapesjs/react";
import "grapesjs/dist/css/grapes.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useMemo } from "react";
import { AppShell } from "@mantine/core";
import { Top } from "../ui/top";
import { RightBar } from "../ui/right-bar";
import CustomModal from "../ui/custom-modal-manager";
import { CustomAssetManager } from "../ui/custom-asset-manager";
import { Button } from "../../grapes-component/button";
import { Carousel } from "../../grapes-component/carousel";
import { AdjustableText } from "../../grapes-component/adjustable-text";
const existingHtml = ` <section
id='navbar'
    data-gjs-type="navbar"
    class="gjs-block-section z-50  sticky top-0 "
  >
      <div class='bg-white text-black flex gap-4 items-center justify-between inset-0 h-[80px]'>
        <div class="mx-auto flex flex-row gap-4  w-[90%] h-full items-center justify-between">
        <div class='block md:hidden'>
        <img src='/app-logo.svg' alt="logo" id='logo' class='h-[40px]  object-contain w-[140px] flex-1' />
            </div>
   <div id='theNav' class='hidden mx-auto md:flex md:mt-0 mt-[-1rem] bg-white md:bg-transparent md:w-full md:shadow-none shadow-xl rounded-bl-xl flex-col md:flex-row gap-4 absolute md:static py-3 md:px-0 px-5 md:py-0  right-0 top-[80px]  w-[60%] h-max md:h-full items-center justify-between'>
    <div class="flex flex-col md:flex-row items-center gap-8 mb-0">
         <div class='hidden md:block'>
   <img src='/app-logo.svg' alt="logo" id='logo' class='h-[40px]  object-contain w-[140px] flex-1' />
   </div>
      <nav class="flex gap-8 flex-col md:flex-row justify-center items-center flex-1">
        <a href="#" class="text-[#444444] hover:text-black line-clamp-1 text-[16px] font-normal font=inter capitalize whitespace-nowrap">Men</a>
      </nav>
    </div>
    <div class="flex flex-col md:flex-row items-center my-8 md:my-0 justify-center gap-8 md:justify-between">
      <a href="/auth/login" class="text-[#161616] whitespace-nowrap font-bold text-[14px] md:text-[16px] font=inter">
        Login
      </a>
      <div  id='cartButton' class="text-[#444444] relative cursor-pointer flex justify-center items-center h-[30px] w-[30px] font-normal font=inter">
           <div id='cartValueBox' class=' absolute right-[-10px] top-0 h-[25px] w-[25px] rounded-[50%] bg-blue-600 flex justify-center items-center'><p id='cartValue' class='text-white text-[14px]'>0</p></div>
        <img class="contrast-[100%] grayscale-[100%] invert-[100%] filter" src="https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/editor/navbar-icons/morvane_3_shopping.svg" alt="user-icon" />
      </div>
    </div>
    </div>
       <div class='cursor-pointer flex md:hidden ml-auto justify-end' id='navToggle'>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
      <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
    </svg>
   </div>
      <div class='cursor-pointer hidden  md:hidden ml-auto justify-end' id='navToggleClose'>
    <?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g></svg>
   </div>
    </div>
</div>
    <div>
  </section>
  
<section 
data-gjs-type="hero" 
id="hero" 
class="gjs-block-section grid grid-cols-1 md:grid-cols-2 gap-[4px] md:h-[800px] h-[600px] w-full relative overflow-hidden"
>
<!-- Left Side (Hero Text and Button) -->
<div 
  class="relative md:h-[800px] h-[600px] bg-cover bg-center after:content-[''] after:absolute after:size-full after:bg-black/65 md:after:bg-black/50 after:inset-0" 
  style="background-image: url('https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/section-template-images/fashion-ecommerce/hero/asset3-1.webp');"
>
<div class="relative z-20 flex flex-col justify-between h-full">
  <div></div>
  <div class="max-w-[500px] md:mx-20 mx-10 mb-20">
    <p class="text-white text-[20px] font-inter mb-[10px]">
      Welcome to Your Go-To Store for Trendy and Timeless Essentials. Explore our curated collection of quality pieces that elevate your style effortlessly.
    </p>
    <button 
      class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#000] text-white text-base md:text-[14px] font-playfair"
    >
      <span class="text-[14px] whitespace-nowrap">Shop Now</span>
    </button>
  </div>
</div>
</div>


<!-- Right Side (Image Display for Larger Screens) -->
<div 
  class="hidden md:block md:h-[800px] h-[600px] bg-cover bg-center" 
  style="background-image: url('https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/section-template-images/fashion-ecommerce/hero/asset3-2.webp');"
>
</div>
</section>


<section data-gjs-type="footer" class="gjs-block-section border-t-2 py-4 bg-[#1c1c1c]" id="footer">
<div class="flex flex-col md:flex-row items-center mx-auto justify-between w-[90%] py-10">
  <!-- Left Section -->
  <div class="flex flex-col gap-3 pb-5">
    <a href="/">
      <img id="logo" src="/app-logo.svg" alt="brand logo" class="h-[50px] w-[50px] rounded-full object-cover" />
    </a>
    <p class="m-0 max-w-[320px] text-[14px] text-[#e0e0e0] md:text-[16px]">
      Our mission is to transform your ideas into reality and create lasting impacts
    </p>
    <nav class="flex flex-wrap items-center gap-6">
      <a href="#" class="font-semibold text-[#ecebff]">Home</a>
      <a href="#about" class="font-semibold text-[#ecebff]">About</a>
      <a href="#services" class="font-semibold text-[#ecebff]">Services</a>
      <a href="#blogs" class="font-semibold text-[#ecebff]">Blogs</a>
      <a href="#contact" class="font-semibold text-[#ecebff]">Contact</a>
    </nav>
         <div class="flex flex-wrap items-center underline gap-6">
      <a href="/privacy-policy" class="font-semibold text-[#ecebff]">Privacy Policy</a>
      <a href="/terms-of-service" class="font-semibold text-[#ecebff]">Terms and Conditions</a>
    </div>
  </div>

  <!-- Right Section -->
  <div class="p-5">
    <h1 class="text-[#fff] font-semibold text-[16px] mb-2 md:text-left">
      Subscribe to our newsletter
    </h1>
    <div id="contactForm" class="flex flex-col sm:flex-row items-center gap-4">
      <input id="contactEmailInput" placeholder="Enter your email address" 
        class="placeholder:text-[#767676] rounded-[8px] text-white bg-transparent border border-[#E0E0E0] py-[10px] px-4 w-full sm:w-auto" />
      <button id="submitContactForm" 
        class="bg-[#4840e0] sm:w-[40%] rounded-[8px] text-white text-[16px] py-[10px] px-4">
        Subscribe
      </button>
    </div>
  </div>
</div>

<!-- Footer Bottom -->
<div class="flex w-[90%] flex-wrap items-center justify-between gap-7 border-t-2 py-2 mx-auto">
  <p class="mt-3 text-[14px] text-[#7C7C7C]">
    © 2024 Khaime LLC. All rights reserved.
  </p>
  <div class="flex items-center gap-2">
    <button class="text-[#f6f6f6]">
      <img src="https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/icons-svg/social/instagram-consulting.svg" alt="Instagram" />
    </button>
    <button class="text-[#f6f6f6]">
      <img src="https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/icons-svg/social/facebook-consulting.svg" alt="Facebook" />
    </button>
    <button class="text-[#f6f6f6]">
      <img src="https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/icons-svg/social/twitter-consulting.svg" alt="Twitter" />
    </button>
    <button class="text-[#f6f6f6]">
      <img src="https://d11plbois4124e.cloudfront.net/khaime-public-assets/website-builder/icons-svg/social/youtube-consulting.svg" alt="YouTube" />
    </button>
  </div>
</div>
</section>`

export const Grapejs = () => {
  const onEditor = (editor: Editor) => {
 editor.addComponents(existingHtml )
  };


  const canvasConfig: EditorConfig["canvas"] = {
    scripts: ["https://vjs.zencdn.net/7.19.2/video.min.js", 'https://cdn.tailwindcss.com'],
  };

  const editorOptions: EditorConfig = useMemo(() => {
    return {
      height: '100vh',
      storageManager: false,
      undoManager: { trackSelection: false },
      selectorManager: { componentFirst: true },
      // dragManager: {
      //   enabled: false,
        
      // },
      dragMode:'translate',
      projectData: {
        assets: [
          'https://via.placeholder.com/350x250/78c5d6/fff',
          'https://via.placeholder.com/350x250/459ba8/fff',
          'https://via.placeholder.com/350x250/79c267/fff',
          'https://via.placeholder.com/350x250/c5d647/fff',
          'https://via.placeholder.com/350x250/f28c33/fff',
        ],

        pages: [
          {
            name: 'Home page', 
            content: existingHtml,

          },
        ],

      },
      fromElement: true,
      canvas: canvasConfig, 
      blockManager: {
        custom: true,
        blocks: [
        {
          id: 'custom-button',
          label: 'Custom Button',
          content: '<button data-gjs-type="button" class="bg-blue-500 text-white px-4 py-2 rounded-md">Hello World</button>',
          activate: true,
          category: 'Custom',
          media: '<button data-gjs-type="button" class="bg-blue-500 text-white px-4 py-2 rounded-md">Hello World</button>',
        },
        {
          id: 'custom-adjustable-text',
          label: 'Custom Adjustable Text',
          content: '<div class="adjustable-text-component">Hello World</div>',
          activate: true,
          category: 'Custom',
          media: '<div class="adjustable-text-component">Hello World</div>',
        },
        {
          id: 'custom-carousel',
          label: 'Custom Carousel',
          content: '<div class="carousel-container relative w-full max-w-2xl mx-auto"><div class="carousel-slides overflow-hidden relative"><div class="slide bg-gray-200 p-8 text-center">Slide 1</div><div class="slide bg-gray-300 p-8 text-center hidden">Slide 2</div><div class="slide bg-gray-400 p-8 text-center hidden">Slide 3</div></div><button class="prev-btn absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2" data-carousel-prev>←</button><button class="next-btn absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2" data-carousel-next>→</button></div>',
          activate: true,
          category: 'Custom',
          media: '<div class="carousel-container relative w-full max-w-2xl mx-auto"><div class="carousel-slides overflow-hidden relative"><div class="slide bg-gray-200 p-8 text-center">Slide 1</div><div class="slide bg-gray-300 p-8 text-center hidden">Slide 2</div><div class="slide bg-gray-400 p-8 text-center hidden">Slide 3</div></div><button class="prev-btn absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2" data-carousel-prev>←</button><button class="next-btn absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2" data-carousel-next>→</button></div>',
        }
        ]
      }
    };
  }, []);

  return (
    <GjsEditor
      className={`gjs-custom-editor  `}
      grapesjs={grapesjs}
      options={editorOptions}
      
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
        Button, Carousel, AdjustableText
      ]}
      onEditor={onEditor}
    >
      <AppShell aside={{ width: 400, breakpoint: "sm" }}>
        <AppShell.Header  >
          <Top />
        </AppShell.Header>
        <AppShell.Main
          mt={30}
        >
          <Canvas className="flex-grow gjs-custom-editor-canvas"
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </AppShell.Main>
        <AppShell.Aside>
          <RightBar />
        </AppShell.Aside>
      </AppShell>

      <ModalProvider>
        {({ open, title, content, close }) => <CustomModal opened={open} title={title} content={content} close={close} />}
      </ModalProvider>
      <AssetsProvider>
        {({ assets, select, close, Container }) => <Container> <CustomAssetManager assets={assets} select={select} close={close} /></Container>}
      </AssetsProvider>




    </GjsEditor>
  );
};

