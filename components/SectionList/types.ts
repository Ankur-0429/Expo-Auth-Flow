interface InputItem {
  label: string;
  type: 'input';
  value: string;
  onPress: () => void;
  isDangerous?: boolean;
}

interface BooleanItem {
  label: string;
  type: 'boolean';
  value: boolean;
  isDangerous?: boolean;
}

interface LinkItem {
  label: string;
  type: 'link';
  onPress: () => void;
  isDangerous?: boolean;
}

type SectionItem = InputItem | BooleanItem | LinkItem;

interface SectionType {
  header: string;
  items: SectionItem[];
}

export default SectionType;
