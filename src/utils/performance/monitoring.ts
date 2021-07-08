import perf from '@react-native-firebase/perf';

export type perfDetail = { type: 'Attribute' | 'Metric'; key: string; value: string | number };

export default async function customTrace<T>(
  traceName: string,
  callback: () => Promise<T>,
  details?: perfDetail[]
): Promise<T> {
  // Define & start a trace
  const trace = await perf().startTrace(traceName);

  // Define trace meta details
  if (details) {
    for (const detail of details) {
      if (detail.type === 'Attribute') {
        trace.putAttribute(detail.key, detail.value as string);
      } else if (detail.type === 'Metric') {
        trace.putMetric(detail.key, detail.value as number);
      }
    }
  }

  const result = await callback();

  // Stop the trace
  await trace.stop();
  return result;
}
