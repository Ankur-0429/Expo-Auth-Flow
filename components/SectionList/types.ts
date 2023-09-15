interface InputItem {
  label: string;
  type: 'input';
  value: string;
}

interface BooleanItem {
  label: string;
  type: 'boolean';
  value: boolean;
}

interface LinkItem {
  label: string;
  type: 'link';
}

type SectionItem = InputItem | BooleanItem | LinkItem;

interface SectionType {
  header: string;
  items: SectionItem[];
}

export default SectionType;
