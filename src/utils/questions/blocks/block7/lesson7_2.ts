import { Question } from "@/types/question";

export const getQuestionsForLesson7_2 = (): Question[] => [
  {
    question: "Что такое ORM?",
    options: [
      "Объектно-реляционная модель",
      "Объектно-реляционное отображение",
      "Управление базой данных",
      "Управление объектами"
    ],
    correctAnswer: 1
  },
  {
    question: "Как установить SQLAlchemy?",
    options: [
      "pip install sqlalchemy",
      "pip install sqlalchemy3",
      "python install sqlalchemy",
      "pip setup sqlalchemy"
    ],
    correctAnswer: 0
  },
  {
    question: "Как создать объект класса базы данных в SQLAlchemy?",
    options: [
      "Base = declarative_base()",
      "Base = sql.Base()",
      "Base = create_base()",
      "Base = orm.create_base()"
    ],
    correctAnswer: 0
  },
  {
    question: "Как определить модель таблицы в SQLAlchemy?",
    options: [
      "Создать класс, наследующийся от Base",
      "Использовать sql.Table",
      "Использовать sql.Model",
      "Использовать Base.table"
    ],
    correctAnswer: 0
  },
  {
    question: "Как установить связь \"один ко многим\" между таблицами?",
    options: [
      "relationship()",
      "ForeignKey()",
      "connect()",
      "a и b"
    ],
    correctAnswer: 3
  }
];