using System;
using System.Runtime.Serialization;

namespace Faw.Models.Domain
{
    [Serializable]
    public abstract class BaseEntity : ICloneable
    {
        #region Fields

        private Guid _entityId = Guid.NewGuid();

        #endregion Fields

        #region Public Properties

        [DataMember]
        public Guid EntityId
        {
            get { return _entityId; }
            set { _entityId = value; }
        }


        #endregion Public Properties

        #region ICloneable Members

        public virtual object Clone()
        {
            return this.MemberwiseClone();
        }

        #endregion ICloneable Members
    }
}