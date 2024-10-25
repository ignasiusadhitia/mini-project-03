/*
Tugas ini mensimulasikan bagaimana berbagai peran developer bekerja bersama dalam mengembangkan website. Kalian akan membuat beberapa class yang menggambarkan setiap peran developer dengan tugas spesifik.


Instruksi Pengerjaan:

1. Buat Class Developer:

2. Class Developer harus memiliki minimal 3 method:
o createUI() – Untuk Frontend Developer (membangun tampilan antarmuka pengguna).
o createDb() – Untuk Backend Developer (membangun dan mengelola database).
o createDesign() – Untuk UI/UX Designer (membuat desain user interface).
o Boleh menambahkan method lain, seperti deployWebsite() atau testFunctionality().

3. Buat Minimal 2 Class Turunan (Inheritance):
o Class FrontendDeveloper: Mewarisi class Developer dan menambahkan fitur khusus frontend, seperti animasi.
o Class BackendDeveloper: Mewarisi class Developer dan menambahkan fitur backend, seperti pengelolaan API.

4. Implementasikan Seluruh Prinsip SOLID:
o Single Responsibility Principle (SRP): Setiap class hanya menangani satu tanggung jawab tertentu.
o Open/Closed Principle (OCP): Kelas harus terbuka untuk ekstensi tetapi tertutup untuk modifikasi.
o Liskov Substitution Principle (LSP): Kelas turunan harus dapat menggantikan kelas induknya tanpa memengaruhi fungsionalitas.
o Interface Segregation Principle (ISP): Jika ada fitur khusus, buat interface yang spesifik dan hanya diterapkan pada class yang membutuhkannya.
o Dependency Inversion Principle (DIP): Class tidak boleh bergantung langsung pada class lain; gunakan dependency injection untuk menyuntikkan dependensi.

5. Kreativitas dalam Implementasi:
o Tambahkan kelas, properti, atau metode tambahan untuk memperkaya fungsionalitas.
o Gunakan polimorfisme untuk memperluas fungsionalitas metode jika diperlukan.
*/

// Single Responsibility Principle: Kelas ini hanya bertanggung jawab untuk validasi
class Validator {
  static validate(value, allowedValues, action) {
    if (allowedValues.includes(value)) {
      action();
    } else {
      throw new Error(
        `Invalid value. Allowed values: ${allowedValues.join(", ")}`
      );
    }
  }
}

// Single Responsibility Principle: Kelas ini hanya bertanggung jawab untuk memformat output
class Formatter {
  static formatAssignees(assignees, roles) {
    return roles
      .map((role) => {
        const filtered = assignees.filter((item) =>
          item.assignee.includes(role)
        );
        return `Assigned ${role}(s):\n=======================\n${filtered
          .map(
            (item) =>
              `${item.assignee}${item.status ? `\nStatus: ${item.status}` : ""}`
          )
          .join("\n-----------------------\n")}\n=======================`;
      })
      .join("\n");
  }

  static formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
}

// Abstraction: Role adalah konsep abstrak dari suatu peran
// Encapsulation: Properti #name, #role, dan #level hanya dapat diakses melalui getter dan setter
// Open-Closed Principle: Kelas ini dapat diperluas dengan membuat subclass tanpa mengubah kode di dalamnya
class Role {
  #name;
  #role;
  #level;
  constructor(name, role, level) {
    this.#name = name;
    this.#role = role;
    this.#level = level;
  }

  set setName(name) {
    this.#name = name;
  }

  set setLevel(level) {
    Validator.validate(level, ["Intern", "Junior", "Middle", "Senior"], () => {
      this.#level = level;
    });
  }

  get getName() {
    return this.#name;
  }

  get getRole() {
    return this.#role;
  }

  get getRoleDetails() {
    return `Name: ${this.#name}\nRole: ${this.#role}\nExperience: ${
      this.#level
    }`;
  }

  // Polymorphism: Method introduce akan di-override oleh subclass
  introduce() {
    console.log(`Hi, my name is ${this.getName} and I am a ${this.getRole}.`);
  }
}

// Inheritance: Developer adalah Role khusus dengan kemampuan tambahan
class Developer extends Role {
  constructor(name, role = "Developer", level) {
    super(name, role, level);
  }

  // Metode khusus yang dimiliki Developer
  createIntegration() {
    return "Integrate Frontend and Backend";
  }

  createPR() {
    return "Create Pull Request";
  }

  onReview() {
    return "Review Pull Request";
  }

  onTesting() {
    return "QA Testing";
  }

  rejectPR() {
    return "Reject Pull Request";
  }

  approvePR() {
    return "Approve Pull Request";
  }

  createDeployment() {
    return "Deploy Application";
  }
}

// Inheritance dan Polymorphism: BackEnd adalah jenis Developer khusus dengan metode sendiri
class BackEnd extends Developer {
  constructor(name, level) {
    super(name, "BackEnd Developer", level);
  }

  // Polymorphism: Melakukan override pada metode introduce
  introduce() {
    console.log(
      `Hi, my name is ${this.getName} and I am a ${this.getRole}. I love to create backend systems.`
    );
  }

  // Metode khusus BackEnd Developer
  setUpServer() {
    return "Set Up Server";
  }

  createDb() {
    return "Create Database";
  }

  createBusinessLogic() {
    return "Create Business Logic";
  }
}

// Inheritance dan Polymorphism: FrontEnd adalah jenis Developer khusus dengan metode sendiri
class FrontEnd extends Developer {
  constructor(name, level) {
    super(name, "FrontEnd Developer", level);
  }

  // Polymorphism: Melakukan override pada metode introduce
  introduce() {
    console.log(
      `Hi, my name is ${this.getName} and I am a ${this.getRole}. I love to create beautiful user interfaces.`
    );
  }

  // Metode khusus FrontEnd Developer
  createUi() {
    return "Implement UI Components";
  }

  createUx() {
    return "Implement User Interactions";
  }

  createStyle() {
    return "Implement Styling";
  }
}

// Inheritance: FullStack adalah jenis Developer yang dapat melakukan FrontEnd dan BackEnd
class FullStack extends Developer {
  constructor(name, level) {
    super(name, "FullStack Developer", level);
    this.backEnd = new BackEnd(); // object composition
    this.frontEnd = new FrontEnd(); // object composition
  }

  // Metode yang memanfaatkan fungsi FrontEnd dan BackEnd
  setUpServer() {
    return this.backEnd.setUpServer();
  }

  createDb() {
    return this.backEnd.createDb();
  }

  createBusinessLogic() {
    return this.backEnd.createBusinessLogic();
  }

  createUi() {
    return this.frontEnd.createUi();
  }

  createUx() {
    return this.frontEnd.createUx();
  }

  createStyle() {
    return this.frontEnd.createStyle();
  }

  // Polymorphism: Melakukan override pada metode introduce
  introduce() {
    console.log(
      `Hi, my name is ${this.getName} and I am a ${this.getRole}. I love to create fullstack applications.`
    );
  }
}

// Inheritance: UiUxDesigner adalah Role khusus dengan metode yang sesuai
class UiUxDesigner extends Role {
  constructor(name, level) {
    super(name, "UI/UX Designer", level);
  }

  introduce() {
    console.log(
      `Hi, my name is ${this.getName} and I am a ${this.getRole}. I love to design user interfaces.`
    );
  }

  // Metode khusus UI/UX Designer
  createWireframes() {
    return "Create Wireframes";
  }

  createDesign() {
    return "Create Design";
  }

  createPrototypes() {
    return "Create Prototypes";
  }

  createSystemArchitecture() {
    return "Create System Architecture";
  }
}

// Inheritance: QaTester adalah Role khusus dengan metode yang sesuai
class QaTester extends Role {
  constructor(name, level) {
    super(name, "QA Tester", level);
  }

  introduce() {
    console.log(
      `Hi, my name is ${this.getName} and I am a ${this.getRole}. I love to test user interfaces.`
    );
  }

  // Metode khusus QA Tester
  runUnitTests() {
    return "Run Unit Tests";
  }

  runIntegrationTests() {
    return "Run Integration Tests";
  }

  runPerformanceTests() {
    return "Run Performance Tests";
  }
}

// Dependency Inversion Principle: Task menggunakan Formatter dan Validator tanpa ketergantungan langsung
class Task {
  constructor(taskName, startDate, endDate) {
    this.taskName = taskName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.assignees = [];
  }

  // Menambahkan deskripsi tugas
  addTaskDescription(assignee) {
    this.assignees.push({ assignee });
  }

  // Menampilkan detail tugas
  getTaskDetails() {
    console.log(
      `\nTASK DETAILS\nTask: ${this.taskName}\nStart Date: ${
        this.startDate
      }\nEnd Date: ${
        this.endDate
      }\n=======================\n${Formatter.formatAssignees(this.assignees, [
        "Designer",
        "Developer",
        "Tester",
      ])}\n\n`
    );
  }
}

// Report memiliki tugas untuk memperbarui dan menampilkan laporan
class Report {
  constructor(task) {
    this.task = task;
    this.reportDate = new Date();
  }

  // Memperbarui status tugas untuk assignee tertentu
  updateReport(assignee, status) {
    this.task.assignees.forEach((item) => {
      if (item.assignee === assignee) {
        item.status = status;
      }
    });
  }

  // Mengambil atau menampilkan detail laporan
  getReportDetails() {
    console.log(
      `\nREPORT DETAILS\nTask: ${this.task.taskName}\nStart Date: ${
        this.task.startDate
      }\nEnd Date: ${
        this.task.endDate
      }\n=======================\n${Formatter.formatAssignees(
        this.task.assignees,
        ["Designer", "Developer", "Tester"]
      )}\nReported at: ${Formatter.formatDate(this.reportDate)}\n\n`
    );
  }
}

const dev1 = new FrontEnd("John Doe", "Senior");
dev1.introduce();
const dev2 = new BackEnd("John Doe", "Senior");
dev2.introduce();
const dev3 = new FullStack("John Doe", "Senior");
dev3.introduce();
const designer1 = new UiUxDesigner("John Doe", "Junior");
designer1.introduce();
const tester1 = new QaTester("John Doe", "Senior");
tester1.introduce();

const task1 = new Task("Homepage", "24-10-2024", "31-10-2024");

const assignDev1 = dev1.getRoleDetails;
const assignDev2 = dev2.getRoleDetails;
const assignDev3 = dev3.getRoleDetails;
const assignDesigner1 = designer1.getRoleDetails;
const assignTester1 = tester1.getRoleDetails;

task1.addTaskDescription(assignDev1);
task1.addTaskDescription(assignDev2);
task1.addTaskDescription(assignDev3);
task1.addTaskDescription(assignDesigner1);
task1.addTaskDescription(assignTester1);

task1.getTaskDetails();

const report = new Report(task1);

report.updateReport(assignDev1, dev1.createUi());
report.updateReport(assignDev2, dev2.createDb());
report.updateReport(assignDev3, dev3.createUx());
report.updateReport(assignDesigner1, designer1.createWireframes());
report.updateReport(assignTester1, tester1.runIntegrationTests());
report.getReportDetails();
