export module Colors {
  const accentBackground: string =        '#f06';
  const accentBackgroundDarker: string =  '#ca0055';
  const accentForeground: string =        '#fff';
  const primaryBackground: string =       '#b0bec5';
  const primaryForeground: string =       '#000';

  export const node =               primaryBackground;
  export const nodeSelected =       accentBackground;

  export const nodeValue =          primaryForeground;
  export const nodeValueSelected =  accentForeground;

  export const branch =             accentForeground;
  export const branchSelected =     accentBackgroundDarker;
}
