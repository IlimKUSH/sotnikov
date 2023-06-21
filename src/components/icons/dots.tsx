import { FC, SVGProps } from 'react';

export const DotsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
<svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
<circle cx="2" cy="2" r="2" fill="#C1C1CB"/>
<circle cx="10" cy="2" r="2" fill="#C1C1CB"/>
<circle cx="18" cy="2" r="2" fill="#C1C1CB"/>
</svg>
);