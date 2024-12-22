import { Question } from '@/types/question';

export const getBlock10Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // Автоматизация задач
      {
        question: "Какой модуль используется для работы с файлами?",
        options: [
          "os",
          "file",
          "system",
          "path"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать новую директорию?",
        options: [
          "os.mkdir()",
          "os.create_dir()",
          "os.new_folder()",
          "os.make_directory()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить список файлов в директории?",
        options: [
          "os.listdir()",
          "os.files()",
          "os.get_files()",
          "os.directory_content()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запланировать выполнение задачи?",
        options: [
          "schedule.every().day.at('10:30')",
          "cron.daily('10:30')",
          "task.schedule('10:30')",
          "timer.daily('10:30')"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить аргументы командной строки?",
        options: [
          "sys.argv",
          "os.args",
          "command.arguments",
          "cli.params"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Работа с Excel и PDF
      {
        question: "Какая библиотека используется для работы с Excel?",
        options: [
          "openpyxl",
          "excel",
          "xlswriter",
          "pyexcel"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать новый Excel файл?",
        options: [
          "Workbook()",
          "Excel()",
          "Spreadsheet()",
          "XLSFile()"
        ],
        correctAnswer: 0
      },
      {
        question: "Какая библиотека используется для создания PDF?",
        options: [
          "reportlab",
          "pdfmaker",
          "pypdf",
          "pdflib"
        ],
        correctAnswer: 0
      },
      {
        question: "Как извлечь текст из PDF?",
        options: [
          "PyPDF2.PdfReader()",
          "pdf.extract_text()",
          "pdflib.get_text()",
          "pdf.read_content()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как добавить форматирование в Excel ячейку?",
        options: [
          "cell.style = ...",
          "cell.format(...)",
          "cell.set_style(...)",
          "cell.appearance(...)"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};