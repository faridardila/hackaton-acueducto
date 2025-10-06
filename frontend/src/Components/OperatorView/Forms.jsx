import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function Forms() {
  const [campaigns, setCampaigns] = useState([

    {
      "id": 1,
      "name": "Barrio San Miguel de la Cañada",
      "neighborhood": "San Miguel de la Cañada",
      "description": "Recolección de datos de habitantes e inmuebles del barrio San Miguel de la Cañada para identificar, caracterizar y georreferenciar los predios, las condiciones de ocupación y el acceso a los servicios públicos.",
      "fields": [
        { "id": 1, "label": "Nombres completos", "type": "text", "required": true, "category": "personal" },
        { "id": 2, "label": "Apellidos completos", "type": "text", "required": true, "category": "personal" },
        { "id": 3, "label": "Cédula de ciudadanía", "type": "text", "required": true, "category": "personal" },
        { "id": 4, "label": "Teléfono", "type": "tel", "required": true, "category": "personal" },
        { "id": 5, "label": "Correo electrónico", "type": "email", "required": false, "category": "personal" },
        { "id": 6, "label": "Número de habitantes en el hogar", "type": "number", "required": true, "category": "personal" },
        { "id": 7, "label": "Tiempo de residencia en el barrio (años)", "type": "number", "required": false, "category": "personal" },

        { "id": 8, "label": "Dirección o referencia del inmueble", "type": "text", "required": true, "category": "property" },
        { "id": 9, "label": "Coordenadas GPS", "type": "text", "required": false, "category": "property" },
        { "id": 10, "label": "Tipo de construcción", "type": "select", "options": ["Sólida", "Mixta", "Madera", "Temporal"], "required": true, "category": "property" },
        { "id": 11, "label": "Número de pisos", "type": "number", "required": false, "category": "property" },
        { "id": 12, "label": "Uso del predio", "type": "select", "options": ["Residencial", "Comercial", "Mixto", "Institucional", "Lote vacío"], "required": true, "category": "property" },
        { "id": 13, "label": "Condición de tenencia", "type": "select", "options": ["Propio", "Arrendado", "Posesión", "Invasión"], "required": true, "category": "property" },
        { "id": 14, "label": "Estado físico del inmueble", "type": "select", "options": ["Bueno", "Regular", "Malo"], "required": false, "category": "property" },

        { "id": 15, "label": "Conexión a acueducto", "type": "select", "options": ["Formal", "Comunitaria", "Sin conexión"], "required": true, "category": "services" },
        { "id": 16, "label": "Conexión a alcantarillado", "type": "select", "options": ["Formal", "Pozo", "Sin conexión"], "required": true, "category": "services" },
        { "id": 17, "label": "Conexión de energía eléctrica", "type": "select", "options": ["Formal", "Comunitaria", "Sin conexión"], "required": true, "category": "services" },
        { "id": 18, "label": "Gas domiciliario", "type": "select", "options": ["Formal", "Pipeta", "No tiene"], "required": false, "category": "services" },
        { "id": 19, "label": "Recolección de basuras", "type": "select", "options": ["Formal", "Comunitaria", "No tiene"], "required": false, "category": "services" },
        { "id": 20, "label": "Fuente de agua alterna", "type": "select", "options": ["Carro tanque", "Pozo", "Manguera", "Otra", "Ninguna"], "required": false, "category": "services" },

        { "id": 21, "label": "Tipo de conexión de agua", "type": "select", "options": ["Directa", "Derivada", "Manguera", "Tanque", "Bomba"], "required": false, "category": "technical" },
        { "id": 22, "label": "Diámetro de la tubería (pulgadas)", "type": "text", "required": false, "category": "technical" },
        { "id": 23, "label": "Material de la tubería", "type": "select", "options": ["PVC", "PEAD", "Hierro", "Otro", "Desconocido"], "required": false, "category": "technical" },
        { "id": 24, "label": "Tiene micromedidor", "type": "checkbox", "required": false, "category": "technical" },
        { "id": 25, "label": "Problemas reportados en el suministro", "type": "select", "options": ["Baja presión", "Intermitencia", "Fugas", "Ninguno"], "required": false, "category": "technical" },

        { "id": 26, "label": "Fotografía del predio", "type": "file", "required": false, "category": "observations" },
        { "id": 27, "label": "Observaciones del encuestador", "type": "textarea", "required": false, "category": "observations" }
      ]
    },

    {
      id: 2,
      name: 'Barrio El Prado',
      neighborhood: 'El Prado',
      description: 'Recolección de datos de habitantes e inmuebles del barrio El Prado',
      fields: [
        { id: 1, label: 'Nombres completos', type: 'text', required: true, category: 'personal' },
        { id: 2, label: 'Apellidos completos', type: 'text', required: true, category: 'personal' },
        { id: 3, label: 'Cédula de ciudadanía', type: 'text', required: true, category: 'personal' },
        { id: 4, label: 'Teléfono', type: 'tel', required: true, category: 'personal' },
        { id: 5, label: 'Email', type: 'email', required: false, category: 'personal' },
        { id: 6, label: 'Dirección del inmueble', type: 'text', required: true, category: 'property' },
        { id: 7, label: 'Tipo de inmueble', type: 'select', required: true, options: ['Casa', 'Apartamento', 'Local comercial', 'Lote'], category: 'property' },
        { id: 8, label: 'Estrato', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6'], category: 'property' },
        { id: 9, label: 'Es propietario', type: 'checkbox', required: false, category: 'property' }
      ]
    }
  ]);

  const [activeView, setActiveView] = useState('list');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({});

  const fieldTypes = [
    { value: 'text', label: 'Texto' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Teléfono' },
    { value: 'number', label: 'Número' },
    { value: 'date', label: 'Fecha' },
    { value: 'textarea', label: 'Área de texto' },
    { value: 'select', label: 'Selección' },
    { value: 'checkbox', label: 'Casilla de verificación' },
    { value: 'file', label: 'Archivo/Foto' }
  ];

  const handleCreateCampaign = () => {
    setEditingCampaign({
      id: Date.now(),
      name: '',
      neighborhood: '',
      description: '',
      fields: []
    });
    setActiveView('create');
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign({ ...campaign });
    setActiveView('edit');
  };

  const handleSaveCampaign = () => {
    if (!editingCampaign.name.trim()) {
      alert('El nombre de la campaña es obligatorio');
      return;
    }
    if (!editingCampaign.neighborhood.trim()) {
      alert('El nombre del barrio es obligatorio');
      return;
    }
    if (editingCampaign.fields.length === 0) {
      alert('Debe agregar al menos un campo');
      return;
    }

    if (activeView === 'create') {
      setCampaigns([...campaigns, editingCampaign]);
    } else {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? editingCampaign : c));
    }
    setEditingCampaign(null);
    setActiveView('list');
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta campaña?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const handleAddField = () => {
    const newField = {
      id: Date.now(),
      label: '',
      type: 'text',
      required: false,
      options: [],
      category: 'personal'
    };
    setEditingCampaign({
      ...editingCampaign,
      fields: [...editingCampaign.fields, newField]
    });
  };

  const handleUpdateField = (fieldId, key, value) => {
    setEditingCampaign({
      ...editingCampaign,
      fields: editingCampaign.fields.map(f =>
        f.id === fieldId ? { ...f, [key]: value } : f
      )
    });
  };

  const handleDeleteField = (fieldId) => {
    setEditingCampaign({
      ...editingCampaign,
      fields: editingCampaign.fields.filter(f => f.id !== fieldId)
    });
  };

  const handlePreview = (campaign) => {
    setSelectedCampaign(campaign);
    setFormData({});
    setActiveView('preview');
  };

  const handleSubmitForm = () => {
    const requiredFields = selectedCampaign.fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.id]);

    if (missingFields.length > 0) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    console.log('Datos del formulario:', formData);
    alert('Formulario enviado exitosamente (ver consola)');
    setFormData({});
  };

  const renderFieldEditor = (field) => (
    <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Etiqueta del campo</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleUpdateField(field.id, 'label', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Ej: Nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de campo</label>
          <select
            value={field.type}
            onChange={(e) => handleUpdateField(field.id, 'type', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            {fieldTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            value={field.category || 'personal'}
            onChange={(e) => handleUpdateField(field.id, 'category', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="personal">Datos personales</option>
            <option value="property">Datos del inmueble</option>
            <option value="services">Servicios públicos</option>
            <option value="technical">Datos técnicos</option>
            <option value="observations">Observaciones</option>
          </select>
        </div>
      </div>

      {field.type === 'select' && (
        <div className="mt-3">
          <label className="block text-sm font-medium mb-1">Opciones (separadas por coma)</label>
          <input
            type="text"
            value={field.options?.join(', ') || ''}
            onChange={(e) => handleUpdateField(field.id, 'options', e.target.value.split(',').map(s => s.trim()))}
            className="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="Opción 1, Opción 2, Opción 3"
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleUpdateField(field.id, 'required', e.target.checked)}
            className="mr-2"
          />
          Campo obligatorio
        </label>
        <button
          onClick={() => handleDeleteField(field.id)}
          className="text-red-600 hover:text-red-800 p-2"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderFormField = (field) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccione...</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
        );
      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.files[0] })}
            className="w-full text-xs border border-gray-300 rounded-md file:mr-2 file:py-1.5 file:px-3 file:rounded-l-md file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  if (activeView === 'preview' && selectedCampaign) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Vista Previa del Formulario</h2>
              <p className="text-sm text-gray-600 mt-1">Visualización móvil del formulario</p>
            </div>
            <button
              onClick={() => setActiveView('list')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 rounded-lg shadow-sm"
            >
              <XMarkIcon className="w-5 h-5" />
              Volver
            </button>
          </div>

          <div className="flex justify-center">
            {/* Marco del teléfono */}
            <div className="relative">
              {/* Cuerpo del teléfono */}
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Pantalla */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ width: '375px', height: '667px' }}>
                  {/* Notch/Barra superior */}
                  <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">{selectedCampaign.neighborhood}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Contenido scrolleable */}
                  <div className="h-full overflow-y-auto pb-20" style={{ height: 'calc(667px - 48px)' }}>
                    <div className="p-4">
                      {/* Header del formulario */}
                      <div className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900">{selectedCampaign.name}</h2>
                        <p className="text-xs text-gray-600 mt-1">{selectedCampaign.description}</p>
                      </div>

                      {/* Datos Personales */}
                      {selectedCampaign.fields.filter(f => f.category === 'personal').length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-blue-600 rounded"></div>
                            <h3 className="font-semibold text-base text-gray-900">Datos Personales</h3>
                          </div>
                          <div className="space-y-3">
                            {selectedCampaign.fields.filter(f => f.category === 'personal').map(field => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderFormField(field)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Datos del Inmueble */}
                      {selectedCampaign.fields.filter(f => f.category === 'property').length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-green-600 rounded"></div>
                            <h3 className="font-semibold text-base text-gray-900">Datos del Inmueble</h3>
                          </div>
                          <div className="space-y-3">
                            {selectedCampaign.fields.filter(f => f.category === 'property').map(field => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderFormField(field)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Servicios Públicos */}
                      {selectedCampaign.fields.filter(f => f.category === 'services').length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-yellow-600 rounded"></div>
                            <h3 className="font-semibold text-base text-gray-900">Servicios Públicos</h3>
                          </div>
                          <div className="space-y-3">
                            {selectedCampaign.fields.filter(f => f.category === 'services').map(field => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderFormField(field)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Datos Técnicos */}
                      {selectedCampaign.fields.filter(f => f.category === 'technical').length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-purple-600 rounded"></div>
                            <h3 className="font-semibold text-base text-gray-900">Datos Técnicos</h3>
                          </div>
                          <div className="space-y-3">
                            {selectedCampaign.fields.filter(f => f.category === 'technical').map(field => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderFormField(field)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Observaciones */}
                      {selectedCampaign.fields.filter(f => f.category === 'observations').length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-gray-600 rounded"></div>
                            <h3 className="font-semibold text-base text-gray-900">Observaciones</h3>
                          </div>
                          <div className="space-y-3">
                            {selectedCampaign.fields.filter(f => f.category === 'observations').map(field => (
                              <div key={field.id}>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  {field.label}
                                  {field.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {renderFormField(field)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Botón de envío */}
                      <button
                        onClick={handleSubmitForm}
                        className="w-full bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 shadow-md"
                      >
                        Enviar formulario
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de encendido */}
              <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l"></div>
              {/* Botones de volumen */}
              <div className="absolute left-0 top-24 w-1 h-10 bg-gray-800 rounded-r"></div>
              <div className="absolute left-0 top-36 w-1 h-10 bg-gray-800 rounded-r"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'create' || activeView === 'edit') {
    return (
      <div className="p-6 bg-white rounded shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {activeView === 'create' ? 'Crear Nueva Campaña' : 'Editar Campaña'}
          </h2>
          <button
            onClick={() => {
              setEditingCampaign(null);
              setActiveView('list');
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre de la campaña</label>
            <input
              type="text"
              value={editingCampaign?.name || ''}
              onChange={(e) => setEditingCampaign({ ...editingCampaign, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Censo Barrio El Prado 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Nombre del barrio</label>
            <input
              type="text"
              value={editingCampaign?.neighborhood || ''}
              onChange={(e) => setEditingCampaign({ ...editingCampaign, neighborhood: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: El Prado"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={editingCampaign?.description || ''}
              onChange={(e) => setEditingCampaign({ ...editingCampaign, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              placeholder="Describe el propósito de esta recolección de datos"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Campos del formulario</h3>
              <button
                onClick={handleAddField}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon className="w-5 h-5" />
                Agregar campo
              </button>
            </div>

            <div className="space-y-3">
              {editingCampaign?.fields.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No hay campos. Haz clic en "Agregar campo" para comenzar.
                </p>
              ) : (
                editingCampaign?.fields.map(renderFieldEditor)
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveCampaign}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              <CheckIcon className="w-5 h-5" />
              Guardar campaña
            </button>
            <button
              onClick={() => {
                setEditingCampaign(null);
                setActiveView('list');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Campañas de Recolección por Barrio</h2>
          <p className="text-sm text-gray-600 mt-1">Gestiona la recolección de datos de habitantes e inmuebles por barrio</p>
        </div>
        <button
          onClick={handleCreateCampaign}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Campaña
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No hay campañas creadas</p>
          <p className="text-sm mt-2">Crea tu primera campaña para comenzar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{campaign.name}</h3>
              </div>
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  {campaign.neighborhood}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
              <div className="text-xs text-gray-500 mb-4 flex gap-4">
                <span>{campaign.fields.filter(f => f.category === 'personal').length} campos personales</span>
                <span>{campaign.fields.filter(f => f.category === 'property').length} campos de inmueble</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(campaign)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 text-sm"
                >
                  <EyeIcon className="w-4 h-4" />
                  Vista previa
                </button>
                <button
                  onClick={() => handleEditCampaign(campaign)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCampaign(campaign.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}