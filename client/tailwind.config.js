module.exports = {
  content: ["./src/**/*.{html,js}"],
  // './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
  require("@tailwindcss/typography"), 
  require("daisyui"), 
  // require('tw-elements/dist/plugin'),
  ],

  daisyui: {
    themes: ["cupcake", "dark", "coffee", 
        
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",

    { travelversetheme : {
          
        "primary": "#0E7490",
          
        "secondary": "#CA8A04",
                  
        "accent": "#1FB2A6",
                  
        "neutral": "#191D24",
                  
        "base-100": "#2A303C",
                  
        "info": "#3ABFF8",
                  
        "success": "#36D399",
                  
        "warning": "#FBBD23",
                  
        "error": "#F87272",
      }
    },
    {
      travelversethemesecondary: {
      
        "primary": "#0E7490",
          
        "secondary": "#CA8A04",
                  
        "accent": "#4ee856",
                  
        "neutral": "#1F2537",
                  
        "base-100": "#2D3239",
                  
        "info": "#5AA6ED",
                  
        "success": "#68E8B3",
                  
        "warning": "#FABA0A",
                  
        "error": "#F11E36",
      },
    },
    
  ],
  },
}