using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coloplast.Direct.Core.UIDescriptor;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;

namespace EditorDescriptors
{
	[EditorDescriptorRegistration(TargetType = typeof(string), UIHint = "<%- options.editorName %>")]
	public class <%- options.editorName %>EditorDescriptor : EPiServer.Shell.ObjectEditing.EditorDescriptors.EditorDescriptor
	{
		public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
		{
			//SelectionFactoryType = typeof(SectionBlockColorPickerSelectionFactory);
			ClientEditingClass = "/ClientResources/Editors/<%- options.editorName %>/<%- options.editorName %>.js";

			base.ModifyMetadata(metadata, attributes);
		}
	}
}
