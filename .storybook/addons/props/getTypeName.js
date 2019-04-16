const NODE = /string \| number \| boolean \| \{\} \| ReactElement<any, string \| \(\(props: any\) => ReactElement<any, string \| \.\.\. \| \(new \(props: any\) => Component<any, any, any>\)> \| null\) \| \(new \(props: any\) => Component<([^<>]+)>\)> \| ReactNodeArray \| ReactPortal/;

const CHILD = /string \| number \| boolean \| \{\} \| ReactElement<any, string \| \(\(props: any\) => ReactElement<any, string \| \.\.\. \| \(new \(props: any\) => Component<any, any, any>\)> \| null\) \| \(new \(props: any\) => Component<([^<>]+)>\)> \| \.\.\. \d+ more \.\.\. \| \(ReactPortal & ReactNodeArray\)/;

const ELEMENT = /ReactElement<any, string \| \(\(props: any\) => ReactElement<any, string \| \.\.\. \| \(new \(props: any\) => Component<any, any, any>\)> \| null\) \| \(new \(props: any\) => Component<any, any, any>\)> \| \.\.\. \d+ more \.\.\./;

export default function getTypeName(type) {
  if (type == null) {
    return '';
  }

  type = type.replace(CHILD, 'NonNullable<ReactNode>');
  type = type.replace(NODE, 'ReactNode');
  type = type.replace(ELEMENT, 'ReactElement');

  return type.replace('| undefined', '').trim();
}
