module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: ["cupcake", "dark", "coffee",

    { travelverseTheme : {
          
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
      travelverseThemeSecondary: {
      
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