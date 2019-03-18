/**
 * Block: image-before-after
 *
 * Registering a block with Gutenberg.
 * Image Before After block edits, saves and renders two images with titles
 * and other attributes.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const { Component, Fragment } = wp.element;
const { RichText, MediaUpload, MediaPlaceholder, InspectorControls } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ecolaguna/image-before-after', {
  title: __( 'Image Before After' ),
	 icon: 'shield',
	 category: 'common',
	 keywords: [
    __( 'Image Before After' ),
    __( 'Image' ),
    __( 'EcoLaguna' ),
  ],

  attributes: {
		  beforeTitle: {
			   type: 'array',
			   source: 'children',
			   selector: '.el-iba-before figcaption',
		  },
		  beforeImgId: {
			   type: 'number',
		  },
		  beforeImgUrl: {
			   type: 'string',
			   source: 'attribute',
		    selector: '.el-iba-before img',
		    attribute: 'src',
		  },
    afterTitle: {
			   type: 'array',
			   source: 'children',
			   selector: '.el-iba-after figcaption',
		  },
		  afterImgId: {
			   type: 'number',
		  },
		  afterImgUrl: {
			   type: 'string',
			   source: 'attribute',
		    selector: '.el-iba-after img',
		    attribute: 'src',
		  },
  },

	 /**
	  * The edit function describes the structure of your block in the context of the editor.
	  * This represents what the editor will render when the block is used.
 	 *
 	 * The "edit" property must be a valid function.
 	 *
 	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 	 */
	 edit: function( props ) {
    const {
      className,
      attributes: {
        beforeTitle,
        beforeImgId,
        beforeImgUrl,
        afterTitle,
        afterImgId,
        afterImgUrl,
      },
      setAttributes,
		  } = props;

		  const onChangeBeforeTitle = ( value ) => {
			   setAttributes( { beforeTitle: value } );
		  };

		  const onSelectBeforeImage = ( media ) => {
			   setAttributes( {
        beforeImgId: media.id,
        beforeImgUrl: media.url,
      } );
    };

    const onChangeAfterTitle = ( value ) => {
			   setAttributes( { afterTitle: value } );
		  };

		  const onSelectAfterImage = ( media ) => {
			   setAttributes( {
        afterImgId: media.id,
        afterImgUrl: media.url,
      } );
    };

	   return (
	     <div className={ className }>
        <figure className="el-iba-before">
          <RichText
					       tagName="figcaption"
					       placeholder={ __( 'Before title…', 'ecolaguna-blocks' ) }
					       value={ beforeTitle }
					       onChange={ onChangeBeforeTitle }
			  	    />
        { beforeImgUrl ? (
          <img src={ beforeImgUrl } alt={ __( 'Before Image', 'ecolaguna-blocks' ) } />
        ) : (
          <MediaPlaceholder
			         icon="edit"
				        labels={ {
					         title: __( 'Before image' ),
				        } }
				        onSelect={ onSelectBeforeImage }
		         		allowedTypes="Image"
            value={ beforeImgId }
			       />
        ) }
        </figure>
        <figure className="el-iba-after">
          <RichText
					       tagName="figcaption"
					       placeholder={ __( 'After title…', 'ecolaguna-blocks' ) }
					       value={ afterTitle }
					       onChange={ onChangeAfterTitle }
			  	    />
        { afterImgUrl ? (
          <img src={ afterImgUrl } alt={ __( 'After Image', 'ecolaguna-blocks' ) } />
        ) : (
          <MediaPlaceholder
			         icon="edit"
				        labels={ {
					         title: __( 'After Image' ),
				        } }
				        onSelect={ onSelectAfterImage }
		         		allowedTypes="Image"
            value={ afterImgId }
          />
        ) }
        </figure>
			   </div>
	   );
  },

	 /**
 	 * The save function defines the way in which the different attributes should be combined
 	 * into the final markup, which is then serialized by Gutenberg into post_content.
	  *
 	 * The "save" property must be specified and must be a valid function.
 	 *
 	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 	 */
  save: function( props ) {
    const {
      className,
      attributes: {
        beforeTitle,
        beforeImgId,
        beforeImgUrl,
        afterTitle,
        afterImgId,
        afterImgUrl,
      },
		  } = props;

    return (
      <div className={ className }>
        <figure className="el-iba-before">
          <RichText.Content tagName="figcaption" value={ beforeTitle } />
          { beforeImgUrl && (
          <img src={ beforeImgUrl } alt={ __( 'Before Image', 'ecolaguna-blocks' ) } />
          ) }
        </figure>
        <figure className="el-iba-after">
          <RichText.Content tagName="figcaption" value={ afterTitle } />
          { afterImgUrl && (
          <img src={ afterImgUrl } alt={ __( 'After Image', 'ecolaguna-blocks' ) } />
          ) }
        </figure>
      </div>
    );
  },
} );
