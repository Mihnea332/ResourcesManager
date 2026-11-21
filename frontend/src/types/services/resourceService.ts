import type { CreateResourcePayload, Resource, UpdateResourcePayload } from "../resource";

const API_URL='http://localhost:3000/resources';

export async function getResources():Promise<Resource[]> {
    const res=await fetch(API_URL);
    if (!res.ok) throw new Error('Eroare la incarcarea resurselor')
        return res.json();   
}

export async function createResource(data:CreateResourcePayload):Promise<Resource>{
    const res=await fetch(API_URL,
        {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }
    );
    if(!res.ok) throw new Error('Eroare la creare');
    return res.json();

}

export async function updateResource(id:number,
    data:UpdateResourcePayload
) :Promise<Resource>
{
    const res=await fetch(`${API_URL}/${id}`,
    {
        method:'PATCH',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }
    );
    if (!res.ok) throw new Error('Eroare la actulizare')
    return res.json();
}

export async function archiveResource(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}/archive`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Eroare la arhivare');
}