"use client";

import type { Content, PastProject, TeamMember } from "@/lib/content";
import BilingualField from "../components/BilingualField";
import ImageField from "../components/ImageField";
import SectionPanel from "../components/SectionPanel";
import SortableList from "../components/SortableList";
import {
  AddButton,
  RemoveButton,
  newId,
} from "../components/AddRemoveControls";

export default function AboutEditor({
  data,
  onChange,
  onSave,
  saving,
  disabled,
}: {
  data: Content["about"];
  onChange: (v: Content["about"]) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean;
}) {
  function setTeam(team: TeamMember[]) {
    onChange({ ...data, team });
  }
  function patchMember(id: string, patch: Partial<TeamMember>) {
    setTeam(
      data.team.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  }
  function addMember() {
    setTeam([
      ...data.team,
      {
        id: newId("team"),
        name: "",
        role: { en: "", fr: "" },
        bio: { en: "", fr: "" },
        photo: "",
      },
    ]);
  }
  function removeMember(id: string) {
    setTeam(data.team.filter((m) => m.id !== id));
  }

  function setProjects(pastProjects: PastProject[]) {
    onChange({ ...data, pastProjects });
  }
  function patchProject(id: string, patch: Partial<PastProject>) {
    setProjects(
      data.pastProjects.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  }
  function addProject() {
    setProjects([
      ...data.pastProjects,
      {
        id: newId("proj"),
        title: { en: "", fr: "" },
        description: { en: "", fr: "" },
        image: "",
      },
    ]);
  }
  function removeProject(id: string) {
    setProjects(data.pastProjects.filter((p) => p.id !== id));
  }

  return (
    <SectionPanel
      title="About"
      description="Mission, vision, the team, and past projects."
      onSave={onSave}
      saving={saving}
      disabled={disabled}
    >
      <BilingualField
        label="Mission"
        value={data.mission}
        onChange={(mission) => onChange({ ...data, mission })}
        multiline
        rows={4}
      />
      <BilingualField
        label="Vision"
        value={data.vision}
        onChange={(vision) => onChange({ ...data, vision })}
        multiline
        rows={4}
      />

      <div>
        <h3 className="font-heading text-xl uppercase tracking-wider mb-3">
          Team members
        </h3>
        <SortableList
          items={data.team}
          onChange={setTeam}
          renderItem={(m) => (
            <div className="grid gap-3">
              <div className="flex items-start gap-3 justify-between">
                <label className="block flex-1">
                  <span className="font-heading tracking-widest uppercase text-sm">
                    Name
                  </span>
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => patchMember(m.id, { name: e.target.value })}
                    className="mt-1 w-full bg-white text-brand-black px-3 py-2 border border-brand-black/20 focus:border-brand-red focus:outline-none text-sm"
                  />
                </label>
                <RemoveButton onClick={() => removeMember(m.id)} />
              </div>
              <BilingualField
                label="Role"
                value={m.role}
                onChange={(role) => patchMember(m.id, { role })}
              />
              <BilingualField
                label="Bio"
                value={m.bio}
                onChange={(bio) => patchMember(m.id, { bio })}
                multiline
                rows={3}
              />
              <ImageField
                label="Photo"
                value={m.photo}
                onChange={(photo) => patchMember(m.id, { photo })}
              />
            </div>
          )}
        />
        <div className="mt-3">
          <AddButton label="Add team member" onClick={addMember} />
        </div>
      </div>

      <div>
        <h3 className="font-heading text-xl uppercase tracking-wider mb-3">
          Past projects
        </h3>
        <SortableList
          items={data.pastProjects}
          onChange={setProjects}
          renderItem={(p) => (
            <div className="grid gap-3">
              <div className="flex justify-end">
                <RemoveButton onClick={() => removeProject(p.id)} />
              </div>
              <BilingualField
                label="Title"
                value={p.title}
                onChange={(title) => patchProject(p.id, { title })}
              />
              <BilingualField
                label="Description"
                value={p.description}
                onChange={(description) => patchProject(p.id, { description })}
                multiline
              />
              <ImageField
                label="Image"
                value={p.image}
                onChange={(image) => patchProject(p.id, { image })}
              />
            </div>
          )}
        />
        <div className="mt-3">
          <AddButton label="Add past project" onClick={addProject} />
        </div>
      </div>
    </SectionPanel>
  );
}
