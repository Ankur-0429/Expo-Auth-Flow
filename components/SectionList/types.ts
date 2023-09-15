interface InputItem {
  label: string;
  type: 'input';
  value: string;
  onPress: () => void;
}

interface BooleanItem {
  label: string;
  type: 'boolean';
  value: boolean;
}

interface LinkItem {
  label: string;
  type: 'link';
  onPress: () => void;
}

type SectionItem = InputItem | BooleanItem | LinkItem;

interface SectionType {
  header: string;
  items: SectionItem[];
}

export default SectionType;
