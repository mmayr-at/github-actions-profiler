import { CustomColorPalette } from '@dynatrace/strato-components-preview';
import { Colors } from '@dynatrace/strato-design-tokens';

// The color palette used for the charts.
// See the Strato design system documentation for available options:
// https://developer.dynatrace.com/ui-design/status-and-health/#colors

export const COLOR_SUCCESS = Colors.Charts.Categorical.Color01.Default;
export const COLOR_FAILURE = Colors.Charts.Categorical.Color12.Default;
export const COLOR_CANCELLED = Colors.Charts.Categorical.Color06.Default;

export const COLOR_PALETTE: CustomColorPalette = {
  success: COLOR_SUCCESS,
  failure: COLOR_FAILURE,
  cancelled: COLOR_CANCELLED,
};
