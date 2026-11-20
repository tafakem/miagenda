/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Code, 
  BookOpen, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowLeft,
  AlertCircle,
  Calendar,
  Edit2,
  X,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  TrendingUp
} from 'lucide-react';

type Priority = 'Baja' | 'Media' | 'Alta';

interface Activity {
  id: number;
  text: string;
  isCompleted: boolean;
  date: string;
  priority: Priority;
}

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [currentView, setCurrentView] = useState<'app' | 'code' | 'guide'>('app');
  const [tasks, setTasks] = useState<Activity[]>([
    { id: 1, text: 'Aprender Kotlin y Jetpack Compose', isCompleted: true, date: '2026-11-10', priority: 'Alta' },
    { id: 2, text: 'Crear la aplicación Mi Agenda con Jetpack Compose y Kotlin para estudiantes', isCompleted: false, date: '2026-11-12', priority: 'Media' },
    { id: 3, text: 'Organizar tareas pendientes por fecha y estado', isCompleted: false, date: '2026-11-15', priority: 'Baja' }
  ]);
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState(getTodayString());
  const [inputPriority, setInputPriority] = useState<Priority>('Media');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('Media');

  const [nextId, setNextId] = useState(4);
  const [copied, setCopied] = useState(false);

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim() === '') {
      setErrorMessage('Debes escribir una actividad para continuar.');
      return;
    }
    setErrorMessage('');
    const finalDate = inputDate || getTodayString();
    setTasks([...tasks, { 
      id: nextId, 
      text: inputText.trim(), 
      isCompleted: false, 
      date: finalDate, 
      priority: inputPriority 
    }]);
    setNextId(nextId + 1);
    setInputText('');
    setInputDate(getTodayString());
    setInputPriority('Media');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (errorMessage && e.target.value.trim() !== '') {
      setErrorMessage('');
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleDeleteTask = (id: number) => {
    if (editingId === id) {
      setEditingId(null);
    }
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEditing = (task: Activity) => {
    setEditingId(task.id);
    setEditText(task.text);
    setEditDate(task.date);
    setEditPriority(task.priority);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = (id: number) => {
    if (editText.trim() === '') return;
    setTasks(tasks.map(t => t.id === id ? { 
      ...t, 
      text: editText.trim(), 
      date: editDate || getTodayString(),
      priority: editPriority 
    } : t));
    setEditingId(null);
  };

  // Filtered and sorted tasks
  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const pendingTasks = filteredTasks
    .filter(t => !t.isCompleted)
    .sort((a, b) => a.date.localeCompare(b.date));

  const completedTasks = filteredTasks
    .filter(t => t.isCompleted)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Progress metrics
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Media':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Baja':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const kotlinCode = [
    "package com.example.miagenda",
    "",
    "import android.os.Bundle",
    "import androidx.activity.ComponentActivity",
    "import androidx.activity.compose.setContent",
    "import androidx.compose.foundation.layout.*",
    "import androidx.compose.foundation.lazy.LazyColumn",
    "import androidx.compose.foundation.lazy.items",
    "import androidx.compose.material.icons.Icons",
    "import androidx.compose.material.icons.filled.Delete",
    "import androidx.compose.material.icons.filled.Edit",
    "import androidx.compose.material.icons.filled.Search",
    "import androidx.compose.material3.*",
    "import androidx.compose.runtime.*",
    "import androidx.compose.ui.Modifier",
    "import androidx.compose.ui.unit.dp",
    "import androidx.compose.ui.unit.sp",
    "import java.text.SimpleDateFormat",
    "import java.util.*",
    "",
    "class MainActivity : ComponentActivity() {",
    "    override fun onCreate(savedInstanceState: Bundle?) {",
    "        super.onCreate(savedInstanceState)",
    "        setContent {",
    "            MaterialTheme {",
    "                MiAgendaScreen()",
    "            }",
    "        }",
    "    }",
    "}",
    "",
    "data class ActivityItem(",
    "    val id: Int,",
    "    val text: String,",
    "    val isCompleted: Boolean,",
    "    val date: String,",
    "    val priority: String",
    ")",
    "",
    "@OptIn(ExperimentalMaterial3Api::class)",
    "@Composable",
    "fun MiAgendaScreen() {",
    "    var textInput by remember { mutableStateOf(\"\") }",
    "    var searchQuery by remember { mutableStateOf(\"\") }",
    "    var activities = remember { mutableStateListOf<ActivityItem>() }",
    "",
    "    val total = activities.size",
    "    val completed = activities.count { it.isCompleted }",
    "    val progress = if (total > 0) (completed * 100) / total else 0",
    "",
    "    Scaffold(",
    "        topBar = { TopAppBar(title = { Text(\"Mi Agenda\") }) }",
    "    ) { padding ->",
    "        Column(modifier = Modifier.padding(padding).padding(16.dp)) {",
    "            LinearProgressIndicator(progress = progress / 100f, modifier = Modifier.fillMaxWidth())",
    "            Text(\"Progreso: $progress%\")",
    "        }",
    "    }",
    "}"
  ].join("\n");

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(kotlinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-0 sm:p-4 selection:bg-indigo-500 selection:text-white">
      
      {/* Mobile-First Android Phone Portrait Viewport */}
      <div className="w-full sm:max-w-[410px] h-screen sm:h-[844px] bg-slate-900 sm:rounded-[44px] sm:border-[8px] sm:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Mobile Status Bar */}
        <div className="bg-slate-950 px-6 py-2.5 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
          <span className="font-semibold text-white">15:30</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full absolute left-1/2 -translate-x-1/2 top-2 hidden sm:flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
          </div>
          <div className="flex items-center gap-2">
            <span>5G</span>
            <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-full bg-indigo-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Mobile Header / App Bar */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3.5 shadow-lg flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {currentView !== 'app' && (
              <button 
                onClick={() => setCurrentView('app')}
                className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
                title="Volver a la Agenda"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className="text-base font-bold tracking-tight truncate">Mi Agenda</h1>
              <p className="text-[10px] font-medium text-indigo-100 opacity-95 tracking-tight truncate">I.E.S JUAN JOSE FARFAN CESPEDES</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {currentView === 'app' ? (
              <>
                <button
                  onClick={() => setCurrentView('code')}
                  className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 font-medium backdrop-blur-sm"
                  title="Ver código Kotlin"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Código</span>
                </button>
                <button
                  onClick={() => setCurrentView('guide')}
                  className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 font-medium backdrop-blur-sm"
                  title="Guía para alumnos"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guía</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentView('app')}
                className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-semibold transition-colors shadow-sm"
              >
                Ver Agenda
              </button>
            )}
          </div>
        </div>

        {/* View 1: Main App (Mi Agenda Screen) */}
        {currentView === 'app' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            
            {/* Top Fixed Form Container (Single Column) */}
            <div className="p-3.5 pb-2 bg-slate-900/90 border-b border-slate-800 shrink-0 space-y-2 z-10">
              <form onSubmit={handleAddTask} className="flex flex-col gap-2">
                <div className="space-y-0.5">
                  <label className="text-[11px] font-medium text-slate-400 pl-1">Nueva Actividad</label>
                  <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Ej: Estudiar matemáticas..."
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner ${
                      errorMessage ? 'border-rose-500 ring-1 ring-rose-500/30' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                    }`}
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <div className="relative flex-1 space-y-0.5">
                    <label className="text-[11px] font-medium text-slate-400 pl-1">Fecha límite</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <input
                        type="date"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-2.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5 shrink-0">
                    <label className="text-[11px] font-medium text-slate-400 pl-1">Prioridad</label>
                    <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-1 h-[38px] items-center">
                      {(['Baja', 'Media', 'Alta'] as Priority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setInputPriority(p)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                            inputPriority === p
                              ? p === 'Alta' ? 'bg-rose-500 text-white shadow-sm' : p === 'Media' ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold' : 'bg-blue-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/25 active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar actividad</span>
                </button>

                {errorMessage && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-xl animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            </div>

            {/* Scrollable Task Lists Area with Summary Progress Card & Search Bar */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 custom-scrollbar bg-slate-950">
              
              {/* Summary Progress Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">Progreso General</h3>
                      <p className="text-[10px] text-slate-400">{completedCount} de {totalTasks} tareas completadas</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-indigo-400">{progressPercent}%</span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Real-time Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {tasks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800/60 my-auto">
                  <Layers className="w-10 h-10 mb-2 stroke-1 text-slate-600" />
                  <p className="text-sm font-medium text-slate-300">Tu agenda está vacía</p>
                  <p className="text-xs text-slate-500 mt-1">Escribe tu primera actividad arriba.</p>
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 text-center text-xs text-slate-400 my-auto">
                  🔍 No se encontraron actividades con "{searchQuery}".
                </div>
              ) : (
                <>
                  {/* Pending Section */}
                  {pendingTasks.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          Pendientes ({pendingTasks.length})
                        </span>
                        <span className="text-[10px] text-slate-500">Ordenadas por fecha</span>
                      </div>

                      {pendingTasks.map((task) => (
                        <div key={task.id}>
                          {editingId === task.id ? (
                            /* Inline Edit Form */
                            <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-3 space-y-2.5 shadow-xl">
                              <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Editando Actividad</span>
                              </div>
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                placeholder="Nombre de la actividad"
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                              />
                              <div className="flex gap-2 items-center">
                                <input
                                  type="date"
                                  value={editDate}
                                  onChange={(e) => setEditDate(e.target.value)}
                                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                                <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-0.5 shrink-0">
                                  {(['Baja', 'Media', 'Alta'] as Priority[]).map((p) => (
                                    <button
                                      key={p}
                                      type="button"
                                      onClick={() => setEditPriority(p)}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                                        editPriority === p
                                          ? p === 'Alta' ? 'bg-rose-500 text-white' : p === 'Media' ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-blue-500 text-white'
                                          : 'text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      {p}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={cancelEditing}
                                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Cancelar</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => saveEditing(task.id)}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-indigo-600/25"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>Guardar</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Normal Pending Card */
                            <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100 shadow-sm transition-all group">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => handleToggleTask(task.id)}
                                  className="text-indigo-400 hover:text-indigo-300 transition-colors shrink-0 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-indigo-500/10"
                                  title="Marcar como completada"
                                >
                                  <Square className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                </button>
                                <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                                  <div className="flex items-center justify-between gap-2 pr-1">
                                    <span className="text-xs line-clamp-2 select-none text-slate-100 font-medium leading-snug">
                                      {task.text}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${getPriorityBadgeClass(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-indigo-400 shrink-0" />
                                    <span>{task.date}</span>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0 ml-1">
                                <button
                                  type="button"
                                  onClick={() => startEditing(task)}
                                  className="text-slate-400 hover:text-indigo-400 p-2 rounded-xl hover:bg-indigo-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  title="Editar actividad"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="text-slate-400 hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  title="Eliminar actividad"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                )}

                  {/* Completed Section */}
                  {completedTasks.length > 0 && (
                    <div className="space-y-2 pt-2.5 border-t border-slate-800/80">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          Completadas ({completedTasks.length})
                        </span>
                      </div>

                      {completedTasks.map((task) => (
                        <div key={task.id}>
                          {editingId === task.id ? (
                            /* Inline Edit Form */
                            <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-3 space-y-2.5 shadow-xl">
                              <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Editando Actividad</span>
                              </div>
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                placeholder="Nombre de la actividad"
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                              />
                              <div className="flex gap-2 items-center">
                                <input
                                  type="date"
                                  value={editDate}
                                  onChange={(e) => setEditDate(e.target.value)}
                                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                                />
                                <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-0.5 shrink-0">
                                  {(['Baja', 'Media', 'Alta'] as Priority[]).map((p) => (
                                    <button
                                      key={p}
                                      type="button"
                                      onClick={() => setEditPriority(p)}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                                        editPriority === p
                                          ? p === 'Alta' ? 'bg-rose-500 text-white' : p === 'Media' ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-blue-500 text-white'
                                          : 'text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      {p}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-end gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={cancelEditing}
                                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Cancelar</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => saveEditing(task.id)}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-indigo-600/25"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>Guardar</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Completed Card */
                            <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-slate-900/40 border-slate-800/60 text-slate-400 shadow-sm transition-all opacity-75">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <button
                                  type="button"
                                  onClick={() => handleToggleTask(task.id)}
                                  className="text-emerald-400 hover:text-emerald-300 transition-colors shrink-0 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-emerald-500/10"
                                  title="Marcar como pendiente"
                                >
                                  <CheckSquare className="w-6 h-6 text-emerald-400" />
                                </button>
                                <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                                  <div className="flex items-center justify-between gap-2 pr-1">
                                    <span className="text-xs line-clamp-2 select-none line-through text-slate-400 font-medium leading-snug">
                                      {task.text}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 opacity-80 ${getPriorityBadgeClass(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-slate-600 shrink-0" />
                                    <span>{task.date}</span>
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0 ml-1">
                                <button
                                  type="button"
                                  onClick={() => startEditing(task)}
                                  className="text-slate-500 hover:text-indigo-400 p-2 rounded-xl hover:bg-indigo-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  title="Editar actividad"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="text-slate-500 hover:text-rose-400 p-2 rounded-xl hover:bg-rose-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  title="Eliminar actividad"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Demo Footer Button */}
            <div className="py-2 px-3 border-t border-slate-900 bg-slate-950 flex justify-center shrink-0">
              <button
                type="button"
                onClick={() => {
                  setTasks([
                    { id: 201, text: 'Estudiar Jetpack Compose', isCompleted: true, date: '2026-11-10', priority: 'Alta' },
                    { id: 202, text: 'Hacer tarea de matemáticas', isCompleted: false, date: '2026-11-12', priority: 'Media' },
                    { id: 203, text: 'Revisar proyecto en Android Studio', isCompleted: false, date: '2026-11-20', priority: 'Baja' }
                  ]);
                  setEditingId(null);
                  setSearchQuery('');
                  setErrorMessage('');
                }}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 py-0.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Cargar datos de ejemplo</span>
              </button>
            </div>
          </div>
        )}

        {/* View 2: Kotlin Code View */}
        {currentView === 'code' && (
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-slate-950 custom-scrollbar">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-400" />
                MainActivity.kt
              </h2>
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all flex items-center gap-1 shadow-md shadow-indigo-600/25"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex-1 overflow-x-auto max-h-[580px] custom-scrollbar">
              <pre className="text-[11px] font-mono text-indigo-300 leading-relaxed">
                <code>{kotlinCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* View 3: Student Guide */}
        {currentView === 'guide' && (
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-slate-950 text-slate-300 custom-scrollbar">
            <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Guía para Principiantes
            </h2>
            
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="font-semibold text-indigo-400 text-xs">1. Tarjeta de Resumen con Progreso</span>
                <p className="text-slate-400">Se añadió una tarjeta superior con barra de progreso visual que calcula en tiempo real el porcentaje de tareas completadas.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
                <span className="font-semibold text-indigo-400 text-xs">2. Cálculo en Jetpack Compose</span>
                <p className="text-slate-400">En el código Kotlin puedes ver cómo se calcula el porcentaje de avance usando <code className="text-indigo-300 font-mono">(completed * 100) / total</code> y se muestra con <code className="text-indigo-300 font-mono">LinearProgressIndicator</code>.</p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation Bar / Home Indicator */}
        <div className="bg-slate-950 py-2.5 flex items-center justify-center shrink-0 border-t border-slate-900">
          <div className="w-28 h-1 bg-slate-700 rounded-full"></div>
        </div>

      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.35);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.6);
        }
      `}</style>
    </div>
  );
}
