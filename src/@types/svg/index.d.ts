declare module "*.svg" { //todos os arquivos que terminam com svg
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}