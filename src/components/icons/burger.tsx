import { FC, SVGProps } from 'react';

export const BurgerIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<rect width="20" height="2" fill="#9494A0"/>
<rect y="6" width="20" height="2" fill="#9494A0"/>
<rect y="12" width="20" height="2" fill="#9494A0"/>
</svg>
);