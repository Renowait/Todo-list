import ProfileForm from "@/components/Profile"
import TodoList from "@/components/Todolist"


const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-white-100">
      <h1 className="text-4xl font-bold mb-8">Todo List Application</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <ProfileForm/>
        <TodoList/>
      </div>
    </main>
  )
}
export default page
