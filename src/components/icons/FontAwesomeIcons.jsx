import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faBookOpen,
  faBookBookmark,
  faAward,
  faCircleCheck,
  faArrowRight,
  faArrowLeft,
  faArrowUpRightFromSquare,
  faShieldHalved,
  faArrowTrendUp,
  faStar,
  faWandMagicSparkles,
  faClock,
  faUsers,
  faUser,
  faUserCheck,
  faBuilding,
  faFileCircleCheck,
  faFileLines,
  faCreditCard,
  faKey,
  faCloudArrowUp,
  faEnvelope,
  faCompass,
  faPlay,
  faRotateLeft,
  faPaperPlane,
  faCommentDots,
  faLock,
  faPhone,
  faLocationDot,
  faMagnifyingGlass,
  faFilter,
  faTrophy,
  faQuoteLeft,
  faCircleQuestion,
  faCalendarDays,
  faBars,
  faXmark,
  faCircleXmark,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faSun,
  faMoon,
  faDesktop,
  faCheck,
  faFire,
  faBullseye,
  faTrashCan,
  faLightbulb,
  faTag,
  faTableCells,
  faEye,
  faLayerGroup,
  faSliders,
  faGear,
  faPenToSquare,
  faChartSimple,
  faChartBar,
  faBullhorn,
  faBell,
  faDownload,
  faBus,
  faCar,
  faShoePrints,
  faLocationArrow,
  faTriangleExclamation,
  faCircleExclamation,
  faLaptop,
  faRightFromBracket,
  faTableColumns,
  faPlus,
  faCirclePlus,
  faTurnDown,
  faImage,
  faHandshake,
  faFlag,
  faVolumeHigh,
  faVolumeXmark,
  faBolt,
  faMugHot
} from '@fortawesome/free-solid-svg-icons';

import {
  faWhatsapp,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

// Factory helper to convert FontAwesome icon definition into standard icon component compatible with existing props (size, className, etc.)
function createFaComponent(iconDef, defaultName = 'FaIcon') {
  const Component = React.forwardRef(({ size = 16, className = '', style = {}, ...props }, ref) => {
    const sizeStyle = typeof size === 'number' ? { fontSize: `${size}px` } : { fontSize: size };
    return (
      <FontAwesomeIcon
        ref={ref}
        icon={iconDef}
        className={className}
        style={{ ...sizeStyle, ...style }}
        {...props}
      />
    );
  });
  Component.displayName = defaultName;
  return Component;
}

// Export icon components matching the exact names used across the codebase
export const GraduationCap = createFaComponent(faGraduationCap, 'GraduationCap');
export const BookOpen = createFaComponent(faBookOpen, 'BookOpen');
export const BookOpenCheck = createFaComponent(faBookBookmark, 'BookOpenCheck');
export const Award = createFaComponent(faAward, 'Award');
export const CheckCircle2 = createFaComponent(faCircleCheck, 'CheckCircle2');
export const CheckCircle = createFaComponent(faCircleCheck, 'CheckCircle');
export const ArrowRight = createFaComponent(faArrowRight, 'ArrowRight');
export const ArrowLeft = createFaComponent(faArrowLeft, 'ArrowLeft');
export const ArrowUpRight = createFaComponent(faArrowUpRightFromSquare, 'ArrowUpRight');
export const ShieldCheck = createFaComponent(faShieldHalved, 'ShieldCheck');
export const ShieldAlert = createFaComponent(faShieldHalved, 'ShieldAlert');
export const TrendingUp = createFaComponent(faArrowTrendUp, 'TrendingUp');
export const Star = createFaComponent(faStar, 'Star');
export const Sparkles = createFaComponent(faWandMagicSparkles, 'Sparkles');
export const Clock = createFaComponent(faClock, 'Clock');
export const Users = createFaComponent(faUsers, 'Users');
export const User = createFaComponent(faUser, 'User');
export const UserCheck = createFaComponent(faUserCheck, 'UserCheck');
export const Building = createFaComponent(faBuilding, 'Building');
export const Building2 = createFaComponent(faBuilding, 'Building2');
export const FileCheck = createFaComponent(faFileCircleCheck, 'FileCheck');
export const FileText = createFaComponent(faFileLines, 'FileText');
export const CreditCard = createFaComponent(faCreditCard, 'CreditCard');
export const Key = createFaComponent(faKey, 'Key');
export const UploadCloud = createFaComponent(faCloudArrowUp, 'UploadCloud');
export const Upload = createFaComponent(faCloudArrowUp, 'Upload');
export const MailCheck = createFaComponent(faEnvelope, 'MailCheck');
export const Mail = createFaComponent(faEnvelope, 'Mail');
export const Compass = createFaComponent(faCompass, 'Compass');
export const Play = createFaComponent(faPlay, 'Play');
export const RotateCcw = createFaComponent(faRotateLeft, 'RotateCcw');
export const Send = createFaComponent(faPaperPlane, 'Send');
export const MessageCircle = createFaComponent(faWhatsapp, 'MessageCircle');
export const MessageSquare = createFaComponent(faCommentDots, 'MessageSquare');
export const Lock = createFaComponent(faLock, 'Lock');
export const Phone = createFaComponent(faPhone, 'Phone');
export const PhoneCall = createFaComponent(faPhone, 'PhoneCall');
export const MapPin = createFaComponent(faLocationDot, 'MapPin');
export const Search = createFaComponent(faMagnifyingGlass, 'Search');
export const Filter = createFaComponent(faFilter, 'Filter');
export const Trophy = createFaComponent(faTrophy, 'Trophy');
export const Quote = createFaComponent(faQuoteLeft, 'Quote');
export const HelpCircle = createFaComponent(faCircleQuestion, 'HelpCircle');
export const Calendar = createFaComponent(faCalendarDays, 'Calendar');
export const Menu = createFaComponent(faBars, 'Menu');
export const X = createFaComponent(faXmark, 'X');
export const XCircle = createFaComponent(faCircleXmark, 'XCircle');
export const ChevronDown = createFaComponent(faChevronDown, 'ChevronDown');
export const ChevronUp = createFaComponent(faChevronUp, 'ChevronUp');
export const ChevronLeft = createFaComponent(faChevronLeft, 'ChevronLeft');
export const ChevronRight = createFaComponent(faChevronRight, 'ChevronRight');
export const Sun = createFaComponent(faSun, 'Sun');
export const Moon = createFaComponent(faMoon, 'Moon');
export const Monitor = createFaComponent(faDesktop, 'Monitor');
export const Check = createFaComponent(faCheck, 'Check');
export const Flame = createFaComponent(faFire, 'Flame');
export const Target = createFaComponent(faBullseye, 'Target');
export const Trash2 = createFaComponent(faTrashCan, 'Trash2');
export const Lightbulb = createFaComponent(faLightbulb, 'Lightbulb');
export const Tag = createFaComponent(faTag, 'Tag');
export const Grid = createFaComponent(faTableCells, 'Grid');
export const Eye = createFaComponent(faEye, 'Eye');
export const Layers = createFaComponent(faLayerGroup, 'Layers');
export const Sliders = createFaComponent(faSliders, 'Sliders');
export const Settings = createFaComponent(faGear, 'Settings');
export const Edit = createFaComponent(faPenToSquare, 'Edit');
export const BarChart2 = createFaComponent(faChartBar, 'BarChart2');
export const BarChart3 = createFaComponent(faChartSimple, 'BarChart3');
export const Megaphone = createFaComponent(faBullhorn, 'Megaphone');
export const Bell = createFaComponent(faBell, 'Bell');
export const BellRing = createFaComponent(faBell, 'BellRing');
export const Download = createFaComponent(faDownload, 'Download');
export const ExternalLink = createFaComponent(faArrowUpRightFromSquare, 'ExternalLink');
export const Bus = createFaComponent(faBus, 'Bus');
export const Car = createFaComponent(faCar, 'Car');
export const Footprints = createFaComponent(faShoePrints, 'Footprints');
export const Navigation = createFaComponent(faLocationArrow, 'Navigation');
export const AlertTriangle = createFaComponent(faTriangleExclamation, 'AlertTriangle');
export const AlertCircle = createFaComponent(faCircleExclamation, 'AlertCircle');
export const Laptop = createFaComponent(faLaptop, 'Laptop');
export const LogOut = createFaComponent(faRightFromBracket, 'LogOut');
export const LayoutDashboard = createFaComponent(faTableColumns, 'LayoutDashboard');
export const Plus = createFaComponent(faPlus, 'Plus');
export const PlusCircle = createFaComponent(faCirclePlus, 'PlusCircle');
export const CornerDownLeft = createFaComponent(faTurnDown, 'CornerDownLeft');
export const Image = createFaComponent(faImage, 'Image');
export const HeartHandshake = createFaComponent(faHandshake, 'HeartHandshake');
export const Flag = createFaComponent(faFlag, 'Flag');
export const Volume2 = createFaComponent(faVolumeHigh, 'Volume2');
export const VolumeX = createFaComponent(faVolumeXmark, 'VolumeX');
export const Zap = createFaComponent(faBolt, 'Zap');
export const Coffee = createFaComponent(faMugHot, 'Coffee');

// Direct FontAwesome export for custom usage
export { FontAwesomeIcon };
