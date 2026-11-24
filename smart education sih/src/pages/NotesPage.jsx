import React, { useState } from 'react';
import { FileText, Plus, Search, Tag, Trash2, Edit3, Sparkles, X, Save, BookOpen } from 'lucide-react';
import { mockNotes } from '../data/mockData';

const TAG_COLORS = {
  'AI': 'badge-indigo',
  'Formulas': 'badge-cyan',
  'Exam Prep': 'badge-rose',
  'Algorithms': 'badge-emerald',
  'Graphs': 'badge-amber',
  'Code': 'badge-cyan',
  'OS': 'badge-amber',
  'Concurrency': 'badge-rose',
  'Theory': 'badge-indigo',
};

export default function NotesPage({ setCurrentPage, student }) {
  const [notes, setNotes] = useState(mockNotes);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    subject: 'Artificial Intelligence & ML',
    tags: [],
    content: '',
  });
  const [tagInput, setTagInput] = useState('');

  const subjects = ['all', ...new Set(notes.map(n => n.subject))];

  const filteredNotes = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
      || n.content.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'all' || n.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const saveEdit = () => {
    setNotes(prev => prev.map(n => n.id === selectedNote.id
      ? { ...n, title: editTitle, content: editContent }
      : n
    ));
    setSelectedNote(prev => ({ ...prev, title: editTitle, content: editContent }));
    setIsEditing(false);
  };

  const startEdit = () => {
    setEditTitle(selectedNote.title);
    setEditContent(selectedNote.content);
    setIsEditing(true);
  };

  const createNote = () => {
    if (!newNote.title.trim()) return;
    const created = {
      ...newNote,
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      aiSummary: '',
    };
    setNotes(prev => [created, ...prev]);
    setShowCreate(false);
    setNewNote({ title: '', subject: 'Artificial Intelligence & ML', tags: [], content: '' });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote(p => ({ ...p, tags: [...p.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileText size={28} style={{ color: '#34d399' }} />
            My Notes
          </h1>
          <p className="page-subtitle">
            Your digital notebook — create, organize, and summarize your study notes with AI.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Note
        </button>
      </div>

      <div className="notes-layout">
        {/* Notes Sidebar */}
        <div className="notes-sidebar-pane">
          {/* Search */}
          <div className="notes-search-wrap">
            <Search size={16} style={{ color: 'var(--text-dim)' }} />
            <input
              className="notes-search"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Subject Filter */}
          <div className="subject-filter-list">
            {subjects.map(s => (
              <button
                key={s}
                className={`subj-filter-btn ${subjectFilter === s ? 'active' : ''}`}
                onClick={() => setSubjectFilter(s)}
              >
                {s === 'all' ? 'All Subjects' : s.split(' ')[0] + '...'}
              </button>
            ))}
          </div>

          {/* Notes List */}
          <div className="notes-list-scroll">
            {filteredNotes.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '24px' }}>
                No notes found.
              </div>
            )}
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className={`note-list-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                onClick={() => { setSelectedNote(note); setIsEditing(false); setShowAISummary(false); }}
              >
                <div className="note-item-title">{note.title}</div>
                <div className="note-item-meta">
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{note.date}</span>
                </div>
                <div className="note-item-tags">
                  {note.tags.slice(0, 2).map(tag => (
                    <span key={tag} className={`badge ${TAG_COLORS[tag] || 'badge-indigo'}`} style={{ fontSize: '0.62rem', padding: '2px 6px' }}>{tag}</span>
                  ))}
                  {note.tags.length > 2 && <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>+{note.tags.length - 2}</span>}
                </div>
                <div className="note-item-preview">{note.content.slice(0, 80)}...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Note Detail Pane */}
        <div className="note-detail-pane glass-card">
          {!selectedNote ? (
            <div className="note-empty-state">
              <FileText size={64} style={{ color: 'var(--text-dim)', marginBottom: '16px' }} />
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Select a note to view</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>Or create a new one with the button above.</p>
              <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowCreate(true)}>
                <Plus size={14} /> Create First Note
              </button>
            </div>
          ) : (
            <>
              {/* Note Actions Bar */}
              <div className="note-actions-bar">
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{selectedNote.subject}</span>
                  <div className="note-tags-row">
                    {selectedNote.tags.map(tag => (
                      <span key={tag} className={`badge ${TAG_COLORS[tag] || 'badge-indigo'}`} style={{ fontSize: '0.7rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setShowAISummary(!showAISummary); }}
                  >
                    <Sparkles size={13} /> AI Summary
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={startEdit}>
                    <Edit3 size={13} /> Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: 'rgba(244,63,94,0.15)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.3)' }}
                    onClick={() => deleteNote(selectedNote.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* AI Summary Box */}
              {showAISummary && selectedNote.aiSummary && (
                <div className="ai-summary-box">
                  <div className="ai-summary-header">
                    <Sparkles size={14} style={{ color: '#a78bfa' }} />
                    <strong>AI Summary</strong>
                  </div>
                  <p className="ai-summary-text">{selectedNote.aiSummary}</p>
                </div>
              )}

              {!showAISummary && (
                <>
                  {isEditing ? (
                    <div className="note-editor">
                      <input
                        className="note-title-input"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                      />
                      <textarea
                        className="note-content-area"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={12}
                      />
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button className="btn btn-primary btn-sm" onClick={saveEdit}><Save size={13} /> Save</button>
                      </div>
                    </div>
                  ) : (
                    <div className="note-view">
                      <h2 className="note-view-title">{selectedNote.title}</h2>
                      <div className="note-date-row">
                        <BookOpen size={13} style={{ color: 'var(--text-dim)' }} />
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{selectedNote.date}</span>
                      </div>
                      <div className="note-content-text">{selectedNote.content}</div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreate && (
        <div className="modal-backdrop" onClick={() => setShowCreate(false)}>
          <div className="glass-card modal-create" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>Create New Note</h3>
              <button className="close-btn" onClick={() => setShowCreate(false)}><X size={18} /></button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" placeholder="Note title..." value={newNote.title} onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-input" value={newNote.subject} onChange={e => setNewNote(p => ({ ...p, subject: e.target.value }))}>
                  <option>Artificial Intelligence & ML</option>
                  <option>Data Structures & Algorithms</option>
                  <option>Full Stack Web Architectures</option>
                  <option>Operating Systems & Virtualization</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="form-input" style={{ flex: 1 }} placeholder="Add tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
                  <button className="btn btn-secondary btn-sm" onClick={addTag}><Plus size={13} /></button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {newNote.tags.map(tag => (
                    <span key={tag} className="badge badge-indigo" style={{ cursor: 'pointer' }} onClick={() => setNewNote(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))}>
                      {tag} <X size={10} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" rows={5} placeholder="Write your notes here..." value={newNote.content} onChange={e => setNewNote(p => ({ ...p, content: e.target.value }))} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={createNote}><Plus size={14} /> Create Note</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .notes-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          min-height: 65vh;
        }

        .notes-sidebar-pane { display: flex; flex-direction: column; gap: 10px; }

        .notes-search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
        }

        .notes-search { flex: 1; background: none; border: none; color: var(--text-main); font-size: 0.88rem; outline: none; }
        .notes-search::placeholder { color: var(--text-dim); }

        .subject-filter-list { display: flex; flex-direction: column; gap: 4px; }

        .subj-filter-btn {
          padding: 7px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);
          background: transparent; color: var(--text-muted); font-size: 0.8rem; cursor: pointer; text-align: left; transition: all 0.2s;
        }

        .subj-filter-btn.active { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #a5b4fc; }

        .notes-list-scroll { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; max-height: 60vh; }

        .note-list-item {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .note-list-item:hover { background: rgba(255,255,255,0.07); border-color: rgba(99,102,241,0.3); }
        .note-list-item.active { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.1); }

        .note-item-title { font-size: 0.88rem; font-weight: 700; margin-bottom: 4px; }
        .note-item-meta { margin-bottom: 4px; }
        .note-item-tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px; }
        .note-item-preview { font-size: 0.75rem; color: var(--text-dim); line-height: 1.4; }

        .note-detail-pane { min-height: 500px; display: flex; flex-direction: column; }

        .note-empty-state {
          flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 40px;
        }

        .note-actions-bar {
          display: flex; justify-content: space-between; align-items: flex-start;
          border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 16px;
        }

        .note-tags-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }

        .ai-summary-box {
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3);
          border-radius: var(--radius-sm); padding: 16px; margin-bottom: 16px;
        }

        .ai-summary-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 0.9rem; font-weight: 700; color: #a5b4fc; }
        .ai-summary-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }

        .note-editor { display: flex; flex-direction: column; gap: 12px; flex: 1; }

        .note-title-input {
          font-size: 1.4rem; font-weight: 700; background: transparent; border: none; border-bottom: 1px solid var(--border-color);
          color: var(--text-main); padding: 8px 0; outline: none; font-family: var(--font-heading);
        }

        .note-content-area {
          background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: var(--radius-sm);
          color: var(--text-main); font-size: 0.9rem; padding: 14px; resize: none; outline: none;
          font-family: var(--font-body); line-height: 1.6; flex: 1;
        }

        .note-content-area:focus { border-color: var(--primary); }

        .note-view { flex: 1; }
        .note-view-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
        .note-date-row { display: flex; align-items: center; gap: 6px; margin-bottom: 16px; }
        .note-content-text { font-size: 0.92rem; line-height: 1.75; color: var(--text-muted); white-space: pre-wrap; }

        .modal-backdrop {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
          z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
        }

        .modal-create { width: 100%; max-width: 520px; max-height: 85vh; overflow-y: auto; }
        .modal-form { display: flex; flex-direction: column; gap: 14px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); }
        .form-input { padding: 9px 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: var(--text-main); font-size: 0.88rem; outline: none; transition: border-color 0.2s; font-family: var(--font-body); }
        .form-input:focus { border-color: var(--primary); }
        .form-input option { background: #1a2540; }
        .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; border-radius: 6px; }
        .close-btn:hover { color: white; background: rgba(255,255,255,0.1); }

        @media (max-width: 900px) {
          .notes-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
