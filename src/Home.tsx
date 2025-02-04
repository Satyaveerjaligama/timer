import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { TimerList } from "./components/TimerList";
import { AddTimerModal } from "./components/AddTimerModal";
import { Toaster } from "sonner";
import Button from "./components/Button";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-10">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          <Button
            buttonLabel="Add Timer"
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
            startIcon={<Plus className="w-5 h-5" />}
          />
        </div>

        <TimerList />

        <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;
