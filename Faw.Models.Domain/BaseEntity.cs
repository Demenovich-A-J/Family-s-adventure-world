using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Faw.Models.Domain
{
    public abstract class BaseEntity : INotifyPropertyChanged, INotifyPropertyChanging, ICloneable
    {
        #region Fields

        private static readonly PropertyChangingEventArgs EmptyChangingEventArgs =
            new PropertyChangingEventArgs(string.Empty);
        private Guid _entityId = Guid.NewGuid();
        private bool _isNewEntity = true;

        #endregion Fields

        #region Public Properties

        public Guid EntityId
        {
            get
            {
                return _entityId;
            }
            set
            {
                if (value != _entityId)
                {
                    SendPropertyChanging();
                    _entityId = value;
                    SendPropertyChanged("EntityId");
                }
            }
        }

        [NotMapped]
        public bool IsNewEntity
        {
            get { return _isNewEntity; }
            set
            {
                if (value != _isNewEntity)
                {
                    SendPropertyChanging();
                    _isNewEntity = value;
                    SendPropertyChanged("IsNew");
                }
            }
        }

        #endregion Public Properties

        #region Public Events

        public event PropertyChangingEventHandler PropertyChanging;

        public event PropertyChangedEventHandler PropertyChanged;

        #endregion Public Events

        #region ICloneable Members

        public virtual object Clone()
        {
            return MemberwiseClone();
        }

        #endregion ICloneable Members

        #region Non-Public Virtual Methods

        protected virtual void SendPropertyChanging()
        {
            PropertyChanging?.Invoke(this, EmptyChangingEventArgs);
        }

        protected virtual void SendPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        #endregion Non-Public Virtual Methods
    }
}