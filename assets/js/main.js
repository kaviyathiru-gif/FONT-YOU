/**
 * Preserves exact natural handwriting without artificial smoothing or normalization.
 * @param {Array} rawContours - The raw extracted path coordinates from the handwriting image.
 * @returns {Array} - Unaltered contours maintaining the user's authentic stroke style.
 */
function processNaturalHandwriting(rawContours) {
    // Map through each extracted character contour
    return rawContours.map(contour => {
        // Keep the exact organic curves, varying slants, and individual proportions
        return {
            points: contour.points, // Original coordinate points
            width: contour.measuredWidth, // Individual character width
            height: contour.measuredHeight, // Individual character height
            baselineOffset: contour.baseline // Natural baseline placement
        };
    });
}

/**
 * Builds the font glyphs using exact extracted metrics instead of a rigid grid.
 * @param {Object} fontBuilder - The font generation library instance (e.g., opentype.js)
 * @param {Array} processedGlyphs - The raw handwriting glyph data
 */
function generateExactHandwritingFont(fontBuilder, processedGlyphs) {
    processedGlyphs.forEach(glyphData => {
        // Add each character with its precise natural dimensions and path
        fontBuilder.addGlyph({
            name: glyphData.name,
            unicode: glyphData.unicode,
            advanceWidth: glyphData.width, // Retains your natural character spacing
            path: glyphData.points       // Retains your exact pen strokes and imperfections
        });
    });
}
