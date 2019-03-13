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
		  leftTitle: {
			   type: 'array',
			   source: 'children',
			   selector: 'h2',
		  },
		  leftImgId: {
			   type: 'number',
		  },
		  leftImgUrl: {
			   type: 'string',
			   source: 'attribute',
		    selector: 'img',
		    attribute: 'src',
		  },
    rightTitle: {
			   type: 'array',
			   source: 'children',
			   selector: 'h2',
		  },
		  rightImgId: {
			   type: 'number',
		  },
		  rightImgUrl: {
			   type: 'string',
			   source: 'attribute',
		    selector: 'img',
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
        leftTitle,
        leftImgId,
        leftImgUrl,
        rightTitle,
        rightImgId,
        rightImgUrl,
      },
      setAttributes,
		  } = props;

		  const onChangeLeftTitle = ( value ) => {
			   setAttributes( { leftTitle: value } );
		  };

		  const onSelectLeftImage = ( media ) => {
			   setAttributes( {
        leftImgId: media.id,
        leftImgUrl: media.url,
      } );
    };

    const onChangeRightTitle = ( value ) => {
			   setAttributes( { rightTitle: value } );
		  };

		  const onSelectRightImage = ( media ) => {
			   setAttributes( {
        rightImgId: media.id,
        rightImgUrl: media.url,
      } );
    };

	   return (
	     <div className={ className }>
        <figure>
          <RichText
					       tagName="figcaption"
					       placeholder={ __( 'Write left title…', 'ecolaguna-blocks' ) }
					       value={ leftTitle }
					       onChange={ onChangeLeftTitle }
			  	    />
        { leftImgUrl ? (
          <img src={ leftImgUrl } alt={ __( 'Left Image', 'ecolaguna-blocks' ) } />
        ) : (
          <MediaPlaceholder
			         icon="edit"
				        labels={ {
					         title: __( 'Media area left' ),
				        } }
				        onSelect={ onSelectLeftImage }
		         		allowedTypes="Image"
			       />
        ) }
        </figure>
        <figure>
          <RichText
					       tagName="figcaption"
					       placeholder={ __( 'Write right title…', 'ecolaguna-blocks' ) }
					       value={ rightTitle }
					       onChange={ onChangeRightTitle }
			  	    />
        { rightImgUrl ? (
          <img src={ rightImgUrl } alt={ __( 'Right Image', 'ecolaguna-blocks' ) } />
        ) : (
          <MediaPlaceholder
			         icon="edit"
				        labels={ {
					         title: __( 'Media area right' ),
				        } }
				        onSelect={ onSelectRightImage }
		         		allowedTypes="Image"
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
        leftTitle,
        leftImgId,
        leftImgUrl,
        rightTitle,
        rightImgId,
        rightImgUrl,
      },
		  } = props;

    return (
      <div className={ className }>
        <figure>
          <RichText.Content tagName="figcaption" value={ leftTitle } />
          { leftImgUrl && (
          <img src={ leftImgUrl } alt={ __( 'Left Image', 'ecolaguna-blocks' ) } />
          ) }
        </figure>
        <figure>
          <RichText.Content tagName="figcaption" value={ rightTitle } />
          { rightImgUrl && (
          <img src={ rightImgUrl } alt={ __( 'Right Image', 'ecolaguna-blocks' ) } />
          ) }
        </figure>
      </div>
    );
  },
} );
