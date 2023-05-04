import { CustomColorPalette } from '@dynatrace/strato-components-preview';
import { Colors } from '@dynatrace/strato-design-tokens';

// The color palette used for the charts.
// See the Strato design system documentation for available options:
// https://developer.dynatrace.com/preview/reference/design-system/preview/charts/CategoricalBarChart/#change-the-chart-colors

export const COLOR_SUCCESS = Colors.Charts.Apdex.Excellent.Default;
export const COLOR_FAILURE = Colors.Charts.Apdex.Unacceptable.Default;
export const COLOR_CANCELLED = Colors.Charts.Apdex.Fair.Default;

export const COLOR_PALETTE: CustomColorPalette = {
  success: COLOR_SUCCESS,
  failure: COLOR_FAILURE,
  cancelled: COLOR_CANCELLED,
};
