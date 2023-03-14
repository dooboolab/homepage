declare module '*.png' {
  const content: any;

  export default content;
}


declare module '*.json' {
  const content: any;

  export default content;
}

declare module 'babel-plugin-relay/macro' {
  export { graphql } from 'react-relay';
}
