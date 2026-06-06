const fs = require('fs');
const html = fs.readFileSync('/home/jen/Project/Website/ptm-batan-indah-old/adart.html', 'utf8');

// Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    let css = styleMatch[1];
    // remove body, html, * styles that might conflict with the main app
    css = css.replace(/body\s*{[\s\S]*?}/, '');
    css = css.replace(/html\s*{[\s\S]*?}/, '');
    css = css.replace(/\*\s*{[\s\S]*?}/, '');
    css = css.replace(/header\s*{[\s\S]*?}/, '');
    css = css.replace(/\.header-content\s*{[\s\S]*?}/, '');
    css = css.replace(/nav\s*{[\s\S]*?}/, '');
    css = css.replace(/nav a\s*{[\s\S]*?}/, '');
    css = css.replace(/\.logo\s*{[\s\S]*?}/, '');
    fs.writeFileSync('/home/jen/Project/React/ptm-bi/src/pages/AdArt.css', css);
}

// Extract content
const contentMatch = html.match(/(<div class="adart-hero">[\s\S]*?<\/main>)/);
if (contentMatch) {
    let content = contentMatch[1];
    
    // convert class to className
    content = content.replace(/class="/g, 'className="');
    
    // Convert style="..." to style={{...}}
    // It's a bit tricky with regex, let's just do manual fixes for the known ones:
    content = content.replace(/style="([^"]*)"/g, (match, styleStr) => {
        const styles = styleStr.split(';').filter(s => s.trim());
        const styleObj = {};
        styles.forEach(s => {
            let [key, val] = s.split(':');
            if (key && val) {
                key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[key] = val.trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    // Handle any unclosed tags or React specific syntax
    content = content.replace(/<br>/g, '<br />');
    content = content.replace(/<hr>/g, '<hr />');
    content = content.replace(/&/g, '&amp;');
    content = content.replace(/&amp;amp;/g, '&amp;');

    const componentStr = `import React from 'react';
import './AdArt.css';

const AdArt = () => {
  return (
    <div className="adart-page-container">
      ${content}
    </div>
  );
};

export default AdArt;
`;
    fs.writeFileSync('/home/jen/Project/React/ptm-bi/src/pages/AdArt.jsx', componentStr);
    console.log("Conversion complete!");
} else {
    console.log("Could not find content!");
}
