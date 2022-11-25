import IcoMoon from './IcoMoon';
import iconSet from '../../public/icons/icons.json';
import React from 'react';

const Icon = ({...props}) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
