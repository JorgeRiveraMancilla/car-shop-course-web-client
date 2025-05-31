import { AiOutlineSortAscending, AiOutlineClockCircle } from 'react-icons/ai';
import { BsTagFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFlame, GiFinishLine } from 'react-icons/gi';

export const pageSizeOptions = [4, 8, 12, 16];
export const orderButtons = [
  {
    label: 'Alfabético',
    icon: AiOutlineSortAscending,
    value: 'make',
  },
  {
    label: 'Tiempo',
    icon: AiOutlineClockCircle,
    value: 'endingSoon',
  },
  {
    label: 'Año',
    icon: BsTagFill,
    value: 'new',
  },
];
export const filterButtons = [
  {
    label: 'Disponibles',
    icon: GiFlame,
    value: 'live',
  },
  {
    label: 'Finaliza pronto',
    icon: GiFinishLine,
    value: 'endingSoon',
  },
  {
    label: 'Terminados',
    icon: BsStopwatchFill,
    value: 'finished',
  },
];
