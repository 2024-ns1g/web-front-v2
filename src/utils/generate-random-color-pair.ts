function generateRandomColorPair(): { background: string; border: string } {
    const hue = Math.floor(Math.random() * 360);
    
    const saturation = Math.floor(Math.random() * 20) + 50;
    
    const lightnessBackground = Math.floor(Math.random() * 20) + 70;
    
    const lightnessBorder = lightnessBackground - Math.floor(Math.random() * 10) - 5;
    
    const background = `hsl(${hue}, ${saturation}%, ${lightnessBackground}%)`;
    const border = `hsl(${hue}, ${saturation}%, ${lightnessBorder}%)`;
    
    return { background, border };
}
