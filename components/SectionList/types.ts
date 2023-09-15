interface InputItem {
  icon: string;
  label: string;
  type: 'input';
  value: string;
}

interface BooleanItem {
  icon: string;
  label: string;
  type: 'boolean';
  value: boolean;
}

interface LinkItem {
  icon: string;
  label: string;
  type: 'link';
}

type SectionItem = InputItem | BooleanItem | LinkItem;

interface SectionType {
  header: string;
  items: SectionItem[];
}

export default SectionType;
