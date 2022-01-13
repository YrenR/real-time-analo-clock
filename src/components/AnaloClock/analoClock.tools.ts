/**
 * Generate a style for the transform rotate property
 * @param rotate deg
 * @returns style: { transform: string; };
 */
export const createStyleTransform = (rotate: number) => {
  return { style: { transform: `rotate(${rotate}deg)` } };
};
