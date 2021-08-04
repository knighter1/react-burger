
import { FC } from 'react';
import styles from './HeaderItem.module.css';

interface IHeaderLinkProps {
    caption: string;
    Icon: Function;
    type: "primary" | "secondary";
}

const HeaderItem: FC<IHeaderLinkProps> = ({ caption, Icon, type }) =>
{    
    const textColor = type === "secondary" ? "text_color_inactive" : "";
    
    return (
        <div className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ml-1 mr-1 ${styles.item}`}>
            <Icon className={styles.icon} type={type} />
            <span className={`pl-2 text_type_main-default ${textColor}`}>
                {caption}
            </span>
        </div>
    )
}

export default HeaderItem;