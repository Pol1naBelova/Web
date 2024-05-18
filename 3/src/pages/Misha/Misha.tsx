import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useForm } from "react-hook-form";
import MyDocument from "../../components/MyDocument";

interface IMyForm {
  picture: FileList;
  name: string;
}

const Misha = () => {
  const [task, setTasks] = useState<IMyForm | null>(null);

  const { register, handleSubmit } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const MyForm = (data: IMyForm) => {
    setTasks(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(MyForm)}>
        <input
          {...register("name", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 5,
              message: "Минимальное колличество символов: 5",
            },
          })}
          placeholder="Введите Имя"
        />
        <input
          type="file"
          accept="image/*"
          {...register("picture", {
            required: "Изображение",
          })}
        />
        <button type="submit">Сохранить</button>
      </form>
      {task?.name && task?.picture && (
        <PDFDownloadLink document={<MyDocument name={task.name} picture={task.picture} />} fileName="lab_pdf.pdf">
          {({ loading, error }) => {
            try {
              if (loading) return "Загрузка";
              if (error) throw new Error("Ошибка!");
              return "Скачано";
            } catch (error) {
              console.error("Ошибка при создании PDF", error);
              return "Ошибка создании PDF";
            }
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default Misha;
