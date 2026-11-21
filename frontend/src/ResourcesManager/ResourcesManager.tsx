import React, { useEffect, useState } from 'react';
import type { Resource, ResourceType } from '../types/resource';
import {
  archiveResource,
  createResource,
  getResources,
  updateResource,
} from '../types/services/resourceService';
import './ResourcesManager.css';

function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<ResourceType>('ROOM');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getResources();
        setResources(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    void loadResources();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name,
      category,
      location,
      type,
    };

    try {
      if (editingId !== null) {
        const updated = await updateResource(editingId, payload);
        setResources(resources.map((r) => (r.id === editingId ? updated : r)));
        setEditingId(null);
      } else {
        const created = await createResource(payload);
        setResources([...resources, created]);
      }

      setName('');
      setCategory('');
      setLocation('');
      setType('ROOM');
    } catch (e) {
      console.error(e);
    }
  }

  function handleEditClick(resource: Resource) {
    setEditingId(resource.id);
    setName(resource.name);
    setLocation(resource.location);
    setCategory(resource.category);
    setType(resource.type ?? 'ROOM');
  }

  async function handleArchive(id: number) {
    try {
      await archiveResource(id);
      setResources(resources.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <p className="resources-loading">Loading...</p>;

  return (
    <main className="resources-container">
      <h1 className="resources-title">Resources</h1>

      <form className="resources-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Resource Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Resource Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Resource Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ResourceType)}
          required
        >
          <option value="ROOM">Room</option>
          <option value="OBJECT">Object</option>
        </select>
        <button type="submit" className="btn-submit">
          {editingId !== null ? 'Save' : 'Add'}
        </button>
      </form>

      <ul className="resources-list">
        {resources.map((resource) => (
          <li key={resource.id} className="resource-card">
            <div className="resource-info">
              <strong className="resource-name">{resource.name}</strong>
              <span className="resource-meta">
                {resource.category} &bull; {resource.location}
              </span>
              <span className="resource-badge">{resource.type}</span>
            </div>
            <div className="resource-actions">
              <button
                type="button"
                className="btn-edit"
                onClick={() => handleEditClick(resource)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-archive"
                onClick={() => handleArchive(resource.id)}
              >
                Archive
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ResourcesManager;